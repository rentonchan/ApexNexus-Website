# Rounds 31–50

These rounds were committed straight to `main`. Each one is a single focused change. Nothing here invents clients, testimonials, statistics, prices, or biographies.

## Round 31: Keep phone keyboards from zooming the form

**Change:** Text fields and the task box are 16px on screens under 768px, so iOS does not zoom the page when someone taps the booking form.

**Inspiration:**

- Apple Hong Kong (apple.com/hk) keeps type large enough that a phone can read and tap it without the page jumping.
- HSBC Hong Kong (hsbc.com.hk/zh-hk) treats the phone form as the main path, so focusing a field must not shove the layout sideways.
- Cathay Pacific (cathaypacific.com) builds its booking fields for a thumb, at a size the phone already expects.

**Verification:** Production build passes. At 390px there is no horizontal overflow in English or 中文. The booking confirmation, FAQ, sticky bar, mobile menu, and 404 page still work. No console errors. Mobile Lighthouse performance is recorded in the deploy check for this commit.

## Round 32: Let the browser title follow the language

**Change:** Choosing 中文 sets the tab title to “Apex Nexus — 連結策略與執行” and the description to the existing Chinese hero sentence. English keeps the title and description already in the page head.

**Inspiration:**

- Apple Hong Kong (apple.com/hk) presents the page as a Hong Kong page, including the name in the tab.
- Cathay Pacific (cathaypacific.com/cx/zh_HK) makes the Chinese version a distinct page, not an English tab with Chinese body text.
- HSBC Hong Kong (hsbc.com.hk/zh-hk) keeps the chrome and the words in the same language.

**Verification:** `npm run build` passed. The English title stayed “Apex Nexus — Connecting Strategy to Execution”. After choosing 中文 the title contained 「連結策略與執行」 and `lang` was zh-Hant-HK. Booking, FAQ, sticky bar, mobile menu, and 404 still worked. No console errors. No overflow at 390. Mobile Lighthouse performance was 100.

## Round 33: Say that the brochure opens in a new tab

**Change:** The one-page PDF link now adds “opens in a new tab” / 「在新分頁開啟」 next to the existing download label. The file and the link target are unchanged.

**Inspiration:**

- GOV.UK pattern is widely known, but the sites I looked at were Apple, Cathay, and HSBC. Apple Hong Kong (apple.com/hk) labels a download so you know you are leaving the page flow.
- Cathay Pacific (cathaypacific.com) separates an in-page action from a document that opens beside it.
- HSBC Hong Kong (hsbc.com.hk) marks documents so a phone user is not surprised when a PDF takes over.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 99.

## Round 34: Keep the page still while the menu is open

**Change:** Opening the phone menu locks the page behind it, and tapping outside the menu closes it. Escape still closes it and returns focus to the menu button.

**Inspiration:**

- Apple Hong Kong (apple.com/hk) opens a menu over a page that stays put until you choose.
- HSBC Hong Kong (hsbc.com.hk/zh-hk) expects a tap outside a panel to dismiss it.
- McKinsey (mckinsey.com) keeps navigation from fighting the page scrolling underneath.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu open and Escape, and 404. Mobile Lighthouse performance was 99.

## Round 35: Underline links that sit inside a sentence

**Change:** Links inside a paragraph, such as “Not sure which fits?” and “Prefer to email directly?”, are underlined so they read as links rather than coloured words. Buttons are unchanged.

**Inspiration:**

- GOV.UK underlines text links; the pages I actually opened were these three. Apple Hong Kong (apple.com/hk) makes a text link look different from the sentence around it.
- McKinsey (mckinsey.com) underlines links that appear in running copy.
- IDEO (ideo.com) keeps a text link distinct from a button.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 99.

## Round 36: Make a printed page readable

**Change:** Printing hides the navigation, the animated background, the swipe dots, and the mobile booking bar, and prints the navy footer as navy ink on white. The screen layout is unchanged.

**Inspiration:**

- McKinsey (mckinsey.com) is written to be read, so a printout should be the words rather than the chrome.
- Apple Hong Kong (apple.com/hk) keeps a printed page to the content, not the floating controls.
- Bain (bain.com) separates the story from the tools around it.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 99.
