# KP.ge Psychology Article Template

**Strict Rule:** No Latin/Translit characters in the visible body text. All transliteration is hidden in metadata, code, and file attributes.

---

## 1. The "Invisible" Metadata Layer

*This section is for the CMS/Developer. It defines how we rank for Latin queries without showing them.*

| Field | Instruction | Example |
| --- | --- | --- |
| **URL Slug** | **STRICT LATIN.** Use the exact translit keyword here. | `kp.ge/psychology/social-anxiety-disorder` |
| **Meta Title** | Georgian H1 + (Optional: Brand Tag) | `სოციალური შფოთვის აშლილობა: სრული გზამკვლევი - KP.ge` |
| **Image Filename** | **STRICT LATIN.** Rename image *before* upload. | `social-anxiety-symptoms-guide.jpg` |
| **Image Alt Text** | **HYBRID.** Describe image in Georgian, but include Latin keyword in parentheses *if natural*. | `სოციალური შფოთვის სიმპტომები (Social Anxiety Guide)` |
| **Schema Keywords** | **CRITICAL.** Inject Latin keywords into JSON-LD. | `["socialuri shfotva", "social anxiety", "shfotvis ashliloba"]` |

---

## 2. Article Header (H1)

**Title:** [Topic] + [Value Promise/Benefit]
*Examples:*
- **"შფოთვა: სიმპტომები, მიზეზები და მკურნალობის გზები"**
- **"დაბალი თვითშეფასება: როგორ ამოვიცნოთ და რა ვქნათ"**
- **"ფსიქოლოგიის შესავალი: სრული გზამკვლევი დამწყებთათვის"**

---

## 3. The "Hook" (Problem + Relevance)

*Direct, professional Georgian. No fluff. Establish why this topic matters.*

**Structure:**

1. **The Reality:** "შფოთვა ერთ-ერთი ყველაზე გავრცელებული ფსიქიკური მდგომარეობაა თანამედროვე მსოფლიოში."
2. **The Impact:** "ის გავლენას ახდენს არა მხოლოდ ემოციურ მდგომარეობაზე, არამედ ფიზიკურ ჯანმრთელობასა და ყოველდღიურ ცხოვრებაზე."
3. **The Promise:** "ამ სტატიაში გაიგებთ, რა არის შფოთვა, როგორ ამოიცნოთ და რა მეთოდები არსებობს მის სამართავად."

---

## 4. Newsletter CTA #1 (Mid-Intro)

*Place after the hook, before main content begins.*

> **გსურთ ფსიქოლოგიური ინსაითები ყოველკვირეულად?**
> გამოიწერეთ ჩვენი newsletter და მიიღეთ პრაქტიკული რჩევები პირდაპირ თქვენს მეილზე.
> **[გამოიწერეთ უფასოდ]**

---

## 5. YouTube Video Embed (Primary)

*Mandatory. Place after intro section, approximately 20% into the article.*

**Section Title:** **მოისმინეთ ჩვენი პოდკასტის ეპიზოდი ამ თემაზე**

```html
<div class="video-container">
  <iframe
    src="https://www.youtube.com/embed/[VIDEO_ID]"
    title="[Georgian Video Title]"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>
```

**Surrounding Text:**
"ამ ეპიზოდში დეტალურად განვიხილავთ [topic]-ს და პრაქტიკულ რჩევებს გაგიზიარებთ."

---

## 6. The "Research" Module (Credibility)

*Mandatory for psychology articles. Cite studies and statistics.*

**Section Title:** **რას ამბობს კვლევა**

**Structure:**
- Reference 2-3 relevant studies or statistics
- Use Georgian language for explanation
- Include source attribution

**Example:**
> **კვლევის მიხედვით:**
> - მსოფლიო ჯანდაცვის ორგანიზაციის (WHO) მონაცემებით, შფოთვითი აშლილობა 300 მილიონზე მეტ ადამიანს აქვს მსოფლიოში.
> - კვლევებმა აჩვენა, რომ კოგნიტურ-ბიჰევიორისტული თერაპია (CBT) 60-80% შემთხვევაში ეფექტურია.
>
> *წყარო: World Health Organization, 2023*

---

## 7. Main Content Structure

*Use clear H2/H3 hierarchy. Keep paragraphs short (2-4 sentences).*

### H2: რა არის [Topic]?

Definition and basic explanation in accessible Georgian.

### H2: სიმპტომები / ნიშნები

- Bullet points for easy scanning
- Each symptom with brief explanation
- Use numbered lists for step-by-step processes

### H2: მიზეზები

Explain causes with clear subheadings if needed.

### H2: მკურნალობა / გამკლავების გზები

- Professional treatment options
- Self-help strategies
- When to seek professional help

**Pro Tip Block:**
> **პრაქტიკული რჩევა:**
> დაიწყეთ მარტივი სუნთქვის ვარჯიშებით: 4 წამი ჩასუნთქვა, 4 წამი შეჩერება, 4 წამი ამოსუნთქვა. გაიმეორეთ 5-ჯერ.

---

## 8. Internal Links Module

*Strategic placement within relevant content sections.*

**Link Format:**
- Use Georgian anchor text (70%)
- Link to Hub page with exact match anchor
- Cross-link to 2-3 related articles

**Example Placements:**
- "თუ გაინტერესებთ შფოთვის სხვა ფორმები, წაიკითხეთ ჩვენი სტატია **[სოციალური შფოთვის შესახებ](/psychology/social-anxiety-disorder)**."
- "დაბალი თვითშეფასება ხშირად უკავშირდება შფოთვას. გაიგეთ მეტი **[თვითშეფასების გაუმჯობესებაზე](/psychology/tvitshefaseba-pirovnuli-girebuleba-cxovrebis-xarisxi)**."

---

## 9. YouTube Video Embed #2 (Optional)

*For longer articles. Place before FAQ section.*

**Section Title:** **დამატებითი რესურსი**

Include if the article topic has multiple related podcast episodes.

---

## 10. The FAQ Section

*Use this section to capture featured snippets and voice search queries.*

**H2: ხშირად დასმული კითხვები**

**Q: რა არის შფოთვითი აშლილობის მთავარი სიმპტომები?**
A: მთავარი სიმპტომებია: მუდმივი შეშფოთება, ძილის პრობლემები, კონცენტრაციის სირთულე და ფიზიკური სიმპტომები, როგორიცაა გულისცემის აჩქარება.

**Q: როდის უნდა მივმართო სპეციალისტს?**
A: თუ შფოთვა ხელს უშლის ყოველდღიურ საქმიანობას 2 კვირაზე მეტი ხნის განმავლობაში, რეკომენდებულია ფსიქოლოგთან ან ფსიქიატრთან კონსულტაცია.

**Q: შეიძლება თუ არა შფოთვის თვითმართვა?**
A: მსუბუქი შფოთვის დროს შეგიძლიათ გამოიყენოთ რელაქსაციის ტექნიკები, ფიზიკური აქტივობა და ძილის რეჟიმის დაცვა. მძიმე შემთხვევებში საჭიროა პროფესიონალური დახმარება.

---

## 11. Newsletter CTA #2 (End-Article)

*Strong CTA before related articles section.*

> **მოგეწონათ სტატია?**
>
> მოისმინეთ ჩვენი პოდკასტი YouTube-ზე და გახდით ჩვენი საზოგადოების ნაწილი. ყოველკვირეულად გიზიარებთ ფსიქოლოგიურ ინსაითებს და პრაქტიკულ რჩევებს.
>
> **[გამოიწერეთ Newsletter]** | **[YouTube არხი]**

---

## 12. Related Articles Section

*Display 3-4 related articles from the same silo.*

**H2: მსგავსი სტატიები**

- [სოციალური შფოთვის აშლილობა: სრული გზამკვლევი](/psychology/social-anxiety-disorder-explained)
- [შიში: რა არის და როგორ გავუმკლავდეთ](/psychology/fear)
- [დეპრესიის სიმპტომები](/psychology/understanding-depression-symptoms)

---

## 13. Source Attribution

*Always cite sources for credibility.*

**სტატიის წყაროები:**
- World Health Organization (WHO)
- American Psychological Association (APA)
- [Other relevant sources]

---

## 14. Technical Checklist (Pre-Publish)

**Before you hit publish, verify:**

1. [ ] **URL Check:** Is the URL Latin-only (`/psychology/anxiety`) and NOT Georgian script?
2. [ ] **Filename Check:** Did you upload images with Latin filenames (`anxiety-symptoms.jpg`)?
3. [ ] **Schema Injection:** Did you add Latin keywords to the Article Schema?
4. [ ] **Internal Link to Hub:** Did you link to the appropriate Hub page?
5. [ ] **Cross-links:** Did you add 2-3 links to related articles in the same silo?
6. [ ] **YouTube Video:** Is there at least one video embed after the intro?
7. [ ] **Newsletter CTA:** Are there CTAs mid-article AND at the end?
8. [ ] **FAQ Section:** Are there 3+ questions for featured snippets?
9. [ ] **Source Citations:** Are research sources properly attributed?
10. [ ] **Mobile Preview:** Does the article look good on mobile?

---

## Why This Template Works:

* **User sees:** Professional Georgian psychology content with embedded videos and clear structure.
* **Google sees:** "shfotva", "social anxiety", "depresia" (via URL, Schema, and Filenames).
* **YouTube sees:** Embedded podcast episodes driving channel traffic.
* **Email list:** Newsletter CTAs capture leads for ongoing engagement.

---

## Article Length Guidelines:

| Article Type | Word Count (Georgian) | Sections |
|--------------|----------------------|----------|
| Hub Article | 2000-3000 words | All sections |
| Spoke Article | 1200-1800 words | Core sections (skip optional video #2) |
| Quick Guide | 800-1200 words | Condensed structure |

---

## Schema Markup Template

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Georgian H1 Title]",
  "description": "[Georgian meta description]",
  "keywords": ["latin-keyword-1", "latin-keyword-2", "latin-keyword-3"],
  "author": {
    "@type": "Organization",
    "name": "KP.ge"
  },
  "publisher": {
    "@type": "Organization",
    "name": "KP.ge",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kp.ge/logo.png"
    }
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://kp.ge/psychology/[slug]"
  },
  "image": "https://kp.ge/images/[latin-filename].jpg"
}
```

---

*Last Updated: December 2024*
*Version: 1.0 - KP.ge Psychology Podcast*
