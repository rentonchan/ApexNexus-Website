# Rounds 31–50

These rounds were committed straight to `main`. Each one is a single focused change. Nothing here invents clients, testimonials, statistics, prices, or biographies.

## Round 31: Keep phone keyboards from zooming the form

**Change:** Text fields and the task box are 16px on screens under 768px, so iOS does not zoom the page when someone taps the booking form.

**Inspiration:**

- Apple Hong Kong (apple.com/hk) keeps type large enough that a phone can read and tap it without the page jumping.
- HSBC Hong Kong (hsbc.com.hk/zh-hk) treats the phone form as the main path, so focusing a field must not shove the layout sideways.
- Cathay Pacific (cathaypacific.com) builds its booking fields for a thumb, at a size the phone already expects.

**Verification:** Production build passes. At 390px there is no horizontal overflow in English or 中文. The booking confirmation, FAQ, sticky bar, mobile menu, and 404 page still work. No console errors. Mobile Lighthouse performance is recorded in the deploy check for this commit.
