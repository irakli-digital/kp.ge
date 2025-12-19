import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'

config()

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.AWS_S3_BUCKET!
const BASE_URL = process.env.AWS_S3_BASE_URL!
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images')

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
}

async function uploadFile(filePath: string, s3Key: string): Promise<string> {
  const fileContent = fs.readFileSync(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: s3Key,
    Body: fileContent,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000', // 1 year cache
  })

  await s3Client.send(command)
  return `${BASE_URL}/${s3Key}`
}

async function walkDir(dir: string, baseDir: string, results: { local: string; s3Key: string }[] = []) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    if (file.startsWith('.')) continue // Skip hidden files

    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      await walkDir(filePath, baseDir, results)
    } else {
      const ext = path.extname(file).toLowerCase()
      if (MIME_TYPES[ext]) {
        const relativePath = path.relative(baseDir, filePath)
        const s3Key = `kp-images/${relativePath.replace(/\\/g, '/')}`
        results.push({ local: filePath, s3Key })
      }
    }
  }

  return results
}

async function main() {
  console.log('Scanning images directory...')
  const files = await walkDir(PUBLIC_DIR, PUBLIC_DIR)

  console.log(`Found ${files.length} images to upload`)

  const urlMap: Record<string, string> = {}

  for (let i = 0; i < files.length; i++) {
    const { local, s3Key } = files[i]
    const localPath = `/images/${path.relative(PUBLIC_DIR, local).replace(/\\/g, '/')}`

    try {
      console.log(`[${i + 1}/${files.length}] Uploading: ${s3Key}`)
      const url = await uploadFile(local, s3Key)
      urlMap[localPath] = url
      console.log(`  ✓ ${url}`)
    } catch (error) {
      console.error(`  ✗ Failed to upload ${local}:`, error)
    }
  }

  // Output the URL mapping
  console.log('\n\nURL Mapping (for reference):')
  console.log(JSON.stringify(urlMap, null, 2))

  // Save mapping to file
  fs.writeFileSync(
    path.join(process.cwd(), 'image-url-map.json'),
    JSON.stringify(urlMap, null, 2)
  )
  console.log('\nSaved URL mapping to image-url-map.json')
}

main().catch(console.error)
