Mypen.ge Master SEO Strategy (The Aggregator Blueprint)

## 1. Executive Summary & Positioning

**The Shift:** Mypen.ge is not a "wrapper." It is an **AI Aggregator**.
**The Pitch:** "Why pay $20/month for ChatGPT, $20 for Claude, and $20 for Gemini? Get them ALL in one place, optimized for the Georgian language, for a fraction of the price."

**Primary Objectives:**

1. **Intercept Brand Traffic:** Capture users searching for "ChatGPT Georgia" or "Claude AI".
2. **Dominate "Tool" Intent:** Rank #1 for utility searches (Paraphraser, Spellchecker).
3. **Clean Aesthetics, Dirty SEO:** Maintain a premium Georgian UI while capturing "Translit/Latin" search volume via invisible metadata layers.

---

## 2. Semantic Core & Architecture

This is how your website is structured. It is designed to trap traffic at every stage of the funnel.

### The "Money" Clusters

| Priority | Cluster Name | User Intent | Primary Keywords (Concept) | Target URL Structure |
| --- | --- | --- | --- | --- |
| **P1** | **The Models (Access)** | "I want GPT-4 cheap/easy" | `ChatGPT საქართველოში`, `Claude AI უფასოდ`, `Gemini Pro` | `/models/[model-name]` |
| **P1** | **Native Tools (Sticky)** | "Fix my text" | `ტექსტის გადაკეთება`, `სპელჩეკერი`, `PDF თარგმნა` | `/tools/[tool-name]` |
| **P2** | **Comparisons (Battle)** | "Which one is better?" | `GPT-4 vs Claude 3.5`, `საუკეთესო AI` | `/blog/battles/[article-slug]` |
| **P3** | **pSEO Templates** | "Do this specific task" | `CV შაბლონი`, `სამოტივაციო წერილი`, `სადღეგრძელო` | `/templates/[category]/[slug]` |

---

## 3. The "Invisible Layer" Strategy (Translit/Latin)

**The Problem:** 40% of Georgians search in Latin (`cv is dawera`), but Latin text looks ugly in articles.
**The Solution:** We hide the Latin signals where Google sees them, but the user does not.

### Implementation Rules:

1. **URL Slugs:** **ALWAYS Latin.**
* ✅ `mypen.ge/tools/textis-gadaketeba`
* ❌ `mypen.ge/tools/ტექსტის-გადაკეთება`


2. **Image Filenames:** **ALWAYS Latin.**
* Upload images as: `cv-shabloni-georgia.jpg`, `chatgpt-georgia-review.png`.


3. **Schema Keywords:** Inject Latin variations into the `keywords` field of your JSON-LD Schema.
4. **Alt Text:** Hybrid approach.
* `alt="CV შაბლონი (CV Template for Accountants)"` - The parenthesis makes it acceptable.



---

## 4. Internal Linking Strategy (The "Silo" Architecture)

Do not link randomly. We use **Semantic Silos** to pass authority from your high-traffic blog posts to your high-conversion tool pages.

### The "Hub & Spoke" Model

#### A. The "Career" Silo (Example)

* **The Hub (Money Page):** `/templates/cv-maker` (The Tool)
* **The Spokes (Support Content):**
* `/blog/rogor-davwerot-cv` (Guide) -> **Links to Hub** with anchor: "შექმენით CV"
* `/blog/cv-vs-resume` (Info) -> **Links to Hub**
* `/templates/cover-letter` (Related Tool) -> **Links to Hub**


* **The Rule:** Spoke pages link to the Hub. Spoke pages link to *each other* if relevant. The Hub links *out* only to high-value conversion points (Pricing).

#### B. The "Model Access" Silo

* **The Hub:** `/models/chatgpt` (The Access Page)
* **The Spokes:**
* `/blog/chatgpt-vs-claude` -> **Links to Hub** with anchor: "გამოიყენეთ ChatGPT"
* `/blog/chatgpt-tricks` -> **Links to Hub**



### Anchor Text Distribution Rules

* **70% Exact Match (Georgian):** "ტექსტის გადაკეთება" (Linking to Paraphraser).
* **20% Action Based:** "სცადეთ უფასოდ", "დაიწყე აქ".
* **10% Navigational:** "Mypen Paraphraser", "ჩვენი ინსტრუმენტი".

---

## 5. Content Strategy: The "Consumer Reports"

Every piece of content must prove you are the Aggregator.

**The "Battle-Test" Loop:**

1. Take a keyword (e.g., "Writing a Poem").
2. Run it on GPT-4, Claude, and Mypen Ultra.
3. Publish the results.
4. **Verdict:** "Mypen Ultra won. But if you prefer GPT-4, we have that too."

---

## 6. The Master Article Template (v3.0 - Invisible SEO Edition)

Use this for every manual blog post.

```markdown
# Mypen.ge Article Template

## 1. Invisible Metadata (Dev Only)
- **Slug:** [Latin-only keywords, e.g., /blog/reziumes-dawera]
- **Schema Keywords:** ["reziumes dawera", "cv is sheqmna", "cv maker georgia"]
- **Featured Image File:** `cv-maker-tutorial.jpg`

## 2. Header (H1)
**Title:** [Promise] + [Context]
*Example:* "როგორ დავწეროთ CV ხელოვნური ინტელექტით (2025 წლის გზამკვლევი)"

## 3. The Hook (BLUF)
- **Problem:** Writing is hard.
- **Solution:** AI makes it fast.
- **Aggregator Flex:** "We tested GPT-4, Claude, and Mypen. Here is the winner."

## 4. The "Benchmark" Module (Mandatory)
**Section:** რომელი მოდელი ჯობია?
- **GPT-4 Result:** [Screenshot] - "Good logic, stiff language."
- **Claude 3.5 Result:** [Screenshot] - "Natural flow."
- **Mypen Ultra Result:** [Screenshot] - "Perfect grammar."

> **Internal Link:** "გინდათ თავად შეადაროთ? [სცადეთ სამივე მოდელი აქ](/models/comparison)."

## 5. Step-by-Step Guide
- H2: Step 1 (Georgian Title)
- H2: Step 2 (Georgian Title)
- **Pro Tip:** Include a copy-paste prompt block.

## 6. The "Invisible" FAQ (Capturing Snippets)
*H2: ხშირად დასმული კითხვები*
- Q: [Georgian Question]?
- A: [Answer including link to Tool].

## 7. CTA (The Closer)
"Don't buy 3 subscriptions. Get Mypen."
[Button: Start Free Trial]

```

---

## 7. Execution Roadmap (Next 90 Days)

### Month 1: The Foundation & Aggregator Pivot

1. **Technical:** Implement `SoftwareApplication` Schema with the "Invisible Keyword" injection logic.
2. **Pages:** Launch the `/models/` pages (ChatGPT, Claude, Gemini landing pages).
3. **Content:** Publish 5 "Battle" articles (e.g., GPT vs Claude for Georgian).
4. **Linking:** Ensure Homepage links to `/models/` pages clearly.

### Month 2: The Utility Dominance

1. **Pages:** Launch `/tools/paraphraser` and `/tools/spellchecker` with devoted URLs.
2. **pSEO:** Launch first 50 Templates (CVs, Letters).
3. **Linking:** Connect all "Career" blog posts to the "CV Template" page.

### Month 3: Authority & Scale

1. **Outreach:** Send your "Battle Data" to Georgian tech blogs.
2. **Expansion:** Add 50 more templates (Lifestyle, Social Media).
3. **Review:** Check GSC for "Translit" impressions. If high, double down on that metadata.

---

### Final Sign-Off

This strategy moves you from a "Junior Wrapper" to a "Senior Tech Product."

* You are capturing the **Brand** traffic (GPT/Claude).
* You are capturing the **Lazy** traffic (Templates).
* You are capturing the **Messy** traffic (Translit).
