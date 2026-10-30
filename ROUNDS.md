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

## Round 37: Show the booking email when JavaScript is off

**Change:** A noscript block, in English and 中文, tells a visitor without JavaScript to email hello@apexnexus.hk for the free 30-minute call. The words are the existing hero and booking lines.

**Inspiration:**

- The round-13 reference build already had a noscript line for this site. Apple Hong Kong (apple.com/hk) still states what the page is if the rich layout cannot run.
- Cathay Pacific (cathaypacific.com) keeps a way to book when the interactive page is unavailable.
- HSBC Hong Kong (hsbc.com.hk) always leaves a direct contact path.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 99.

## Round 38: Make the form hint readable

**Change:** Placeholder text in the booking fields uses the same muted ink as body text (`#3E4C63` on white, about 8.5:1) instead of the browser’s faint grey.

**Inspiration:**

- Apple Hong Kong (apple.com/hk) keeps hint text dark enough to read on a light field.
- HSBC Hong Kong (hsbc.com.hk) does not rely on pale grey for the words inside a field.
- Cathay Pacific (cathaypacific.com) expects a booking field’s hint to pass as readable text.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 100.

## Round 39: Select text in the brand colours

**Change:** Selected text is cream on navy, which is about 10:1. It uses the existing footer colours and does not change any wording.

**Inspiration:**

- Apple Hong Kong (apple.com/hk) treats selection as part of the brand, not the browser default.
- McKinsey (mckinsey.com) uses its navy when text is highlighted.
- Pentagram (pentagram.com) keeps a selected passage in the studio’s own colours.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 100.

## Round 40: Keep the booking bar clear of the home indicator

**Change:** The mobile booking bar adds the iPhone safe-area inset, and the page leaves that same space when it scrolls a section into view, so a focused control is not hidden behind the bar. `viewport-fit=cover` is set so the inset is real.

**Inspiration:**

- Apple Hong Kong (apple.com/hk) keeps controls above the home indicator.
- Cathay Pacific (cathaypacific.com) does not let a bottom bar cover the field you are using.
- HSBC Hong Kong (hsbc.com.hk) pads the bottom of a phone screen for the system gesture area.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 99.

## Round 41: Announce the language change

**Change:** After someone chooses EN or 中文, a visually hidden live region says “Language: English” or 「語言：中文」. The buttons still show which one is pressed.

**Inspiration:**

- Apple Hong Kong (apple.com/hk) confirms the language you switched to, not only by repainting the page.
- Cathay Pacific (cathaypacific.com/cx/zh_HK) treats the language choice as something a reader should hear as well as see.
- HSBC Hong Kong (hsbc.com.hk/zh-hk) names the language in the control itself.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 99.

## Round 42: Say which booking fields are required

**Change:** Under the form heading, a line reads “Fields marked with * are required.” / 「標有 * 的欄位必須填寫。」 The stars were already on name, email, and the task.

**Inspiration:**

- HSBC Hong Kong (hsbc.com.hk) says up front which fields a form will not send without.
- Cathay Pacific (cathaypacific.com) marks the booking fields that have to be filled.
- Apple Hong Kong (apple.com/hk) does not leave a required mark unexplained.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 99.

## Round 43: Announce which offering was chosen

**Change:** When a card pre-selects an offering, a visually hidden live region reads the existing label, for example “Interested in: Custom AI Assistant” or 「感興趣的方案：定制AI助手」. The chips were already highlighted.

**Inspiration:**

- Apple Hong Kong (apple.com/hk) confirms a choice you made from another part of the page.
- IDEO (ideo.com) connects a piece of work to the next step so the choice is explicit.
- Cathay Pacific (cathaypacific.com) repeats the selected option where the form is, not only where you tapped.

**Verification:** `npm run build` passed. Shared checks passed: no console errors, no overflow at 390 in English or 中文, booking confirmation in both languages, six FAQ items, sticky bar, mobile menu, and 404. Mobile Lighthouse performance was 99.
