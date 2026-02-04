# Content Inventory — Brazil 2026 Jerseys Pre-Sale Landing Page

This document defines ALL text content required for the frontend.  
Each placeholder represents a single piece of text that must be written by a copywriting AI.

---

## 1. Global Elements

| Location | Placeholder |
|----------|-------------|
| App / Page name | {{app_name}} |
| Browser title | {{browser_title}} |
| Meta description | {{meta_description}} |
| Footer legal text | {{footer_legal}} |
| Footer copyright | {{footer_copyright}} |

---

## 2. Countdown Timer (Top Bar)

**Technical specifications:**
- Countdown target: 2026-01-28T10:00:00 (America/Sao_Paulo timezone)
- Timer color: red
- Purpose: urgency + scarcity signal

| Location | Placeholder |
|----------|-------------|
| Timer label | {{countdown_label}} |
| Timer description | {{countdown_description}} |
| Days unit label | {{countdown_days}} |
| Hours unit label | {{countdown_hours}} |
| Minutes unit label | {{countdown_minutes}} |
| Seconds unit label | {{countdown_seconds}} |
| Expiration message (when timer reaches zero) | {{countdown_expired_message}} |

---

## 3. Hero Section

| Location | Placeholder |
|----------|-------------|
| Main headline | {{hero_headline}} |
| Subheadline | {{hero_subheadline}} |
| Supporting text | {{hero_supporting_text}} |
| Primary CTA button label | {{hero_cta_primary}} |

---

## 4. Offer Information Section

| Location | Placeholder |
|----------|-------------|
| Section title | {{offer_section_title}} |
| Product description | {{offer_product_description}} |
| Product type | {{offer_product_type}} |
| Grade explanation | {{offer_grade_explanation}} |
| Grade unit label | {{offer_grade_unit}} |
| Jerseys per grade | {{offer_jerseys_per_grade}} |
| Available sizes | {{offer_available_sizes}} |
| First payment label | {{offer_first_payment_label}} |
| First payment amount | {{offer_first_payment_amount}} |
| Second payment label | {{offer_second_payment_label}} |
| Second payment amount | {{offer_second_payment_amount}} |
| Total per grade label | {{offer_total_per_grade_label}} |
| Delivery forecast label | {{offer_delivery_label}} |
| Delivery forecast value | {{offer_delivery_value}} |
| Payment method label | {{offer_payment_method}} |
| Minimum order label | {{offer_minimum_order}} |

---

## 5. Purchase Modal

### Modal Header

| Location | Placeholder |
|----------|-------------|
| Modal title | {{modal_title}} |
| Modal description | {{modal_description}} |
| Modal close button aria-label | {{modal_close_aria}} |

### Form Fields

| Field | Label Placeholder | Helper Text Placeholder |
|-------|-------------------|-------------------------|
| Full name | {{field_label_name}} | {{field_helper_name}} |
| CPF | {{field_label_cpf}} | {{field_helper_cpf}} |
| Birth date | {{field_label_birth_date}} | {{field_helper_birth_date}} |
| Phone / WhatsApp | {{field_label_phone}} | {{field_helper_phone}} |
| Grade quantity | {{field_label_grade_quantity}} | {{field_helper_grade_quantity}} |

### Dynamic Calculations Display

| Location | Placeholder |
|----------|-------------|
| Total jerseys label | {{calc_total_jerseys_label}} |
| First payment label | {{calc_first_payment_label}} |
| Second payment label | {{calc_second_payment_label}} |

### Validation Errors

| Error Type | Placeholder |
|------------|-------------|
| Required field | {{error_required}} |
| Invalid name | {{error_invalid_name}} |
| Invalid CPF format | {{error_invalid_cpf_format}} |
| Invalid CPF number | {{error_invalid_cpf_number}} |
| Invalid birth date | {{error_invalid_birth_date}} |
| Underage buyer | {{error_underage}} |
| Invalid phone | {{error_invalid_phone}} |
| Invalid grade quantity | {{error_invalid_grade_quantity}} |
| Minimum grade quantity | {{error_minimum_grade}} |
| General submission error | {{error_submission_failed}} |
| Network error | {{error_network}} |

### Form Actions

| Location | Placeholder |
|----------|-------------|
| Submit button label (default) | {{modal_submit_button}} |
| Submit button label (loading) | {{modal_submit_loading}} |
| Cancel button label | {{modal_cancel_button}} |

---

## 6. Pix Payment Screen

### Instructions

| Location | Placeholder |
|----------|-------------|
| Screen title | {{pix_screen_title}} |
| Main instruction text | {{pix_instruction_main}} |
| QR Code instruction | {{pix_instruction_qrcode}} |
| Copy-paste Pix label | {{pix_copy_label}} |
| Copy button label | {{pix_copy_button}} |
| Copied confirmation | {{pix_copied_confirmation}} |

### Countdown

| Location | Placeholder |
|----------|-------------|
| Payment countdown label | {{pix_countdown_label}} |
| Payment countdown explanation | {{pix_countdown_explanation}} |
| Minutes unit label | {{pix_countdown_minutes}} |
| Seconds unit label | {{pix_countdown_seconds}} |

### Status Messages

| Location | Placeholder |
|----------|-------------|
| Payment pending status | {{pix_status_pending}} |
| Payment pending description | {{pix_status_pending_description}} |
| Payment verifying status | {{pix_status_verifying}} |

### Order Summary

| Location | Placeholder |
|----------|-------------|
| Order summary title | {{pix_order_summary_title}} |
| Buyer name label | {{pix_summary_name}} |
| Grade quantity label | {{pix_summary_grade_quantity}} |
| Total jerseys label | {{pix_summary_total_jerseys}} |
| Amount label | {{pix_summary_amount}} |

---

## 7. Success Page

| Location | Placeholder |
|----------|-------------|
| Success headline | {{success_headline}} |
| Success icon aria-label | {{success_icon_aria}} |
| Confirmation message | {{success_confirmation_message}} |
| Order number label | {{success_order_number_label}} |
| Order details title | {{success_order_details_title}} |
| Buyer name label | {{success_buyer_name_label}} |
| Grade quantity label | {{success_grade_quantity_label}} |
| Total jerseys label | {{success_total_jerseys_label}} |
| Amount paid label | {{success_amount_paid_label}} |
| Remaining payment label | {{success_remaining_payment_label}} |
| Remaining payment explanation | {{success_remaining_explanation}} |
| Delivery forecast label | {{success_delivery_label}} |
| Delivery forecast value | {{success_delivery_value}} |
| Next steps title | {{success_next_steps_title}} |
| Next steps description | {{success_next_steps_description}} |
| Support contact label | {{success_support_label}} |
| Support contact value | {{success_support_value}} |
| Return to home button | {{success_return_button}} |

---

## 8. Expired Page

| Location | Placeholder |
|----------|-------------|
| Expiration headline | {{expired_headline}} |
| Expiration icon aria-label | {{expired_icon_aria}} |
| Explanation text | {{expired_explanation}} |
| What happened label | {{expired_what_happened}} |
| What happened description | {{expired_what_happened_description}} |
| What to do label | {{expired_what_to_do}} |
| What to do description | {{expired_what_to_do_description}} |
| Retry CTA button label | {{expired_retry_button}} |
| Support contact label | {{expired_support_label}} |
| Support contact value | {{expired_support_value}} |

---

## 9. Common / Shared Elements

| Location | Placeholder |
|----------|-------------|
| Currency symbol | {{currency_symbol}} |
| Loading spinner aria-label | {{loading_aria}} |
| Generic error title | {{generic_error_title}} |
| Generic error message | {{generic_error_message}} |
| Try again button | {{try_again_button}} |
| WhatsApp label | {{whatsapp_label}} |

---

## Technical Notes for Copywriting AI

1. **Language:** All text must be in Brazilian Portuguese (pt-BR)
2. **Tone guidance needed:** Confidence as primary emotion, with secondary signals of controlled urgency and scarcity
3. **Character limits:**
   - {{browser_title}}: max 60 characters
   - {{meta_description}}: max 160 characters
   - {{hero_headline}}: concise, impactful
   - Button labels: max 25 characters
4. **Formatting:**
   - Currency values should use Brazilian format: R$ X,XX
   - Phone format: (XX) XXXXX-XXXX
   - CPF format: XXX.XXX.XXX-XX
5. **Key facts to incorporate:**
   - 1 grade = 10 jerseys
   - Sizes: P, M, G, GG
   - First payment: R$ 38 per grade
   - Second payment: R$ 40 per grade
   - Arrival: Late March / Early April 2026
   - Product: Thai Player Version - Brazil National Team Jersey - World Cup 2026
   - Payment: Pix only
   - Pre-sale deadline: 2026-01-28 at 10:00 (America/Sao_Paulo)

---

## Placeholder Count Summary

| Section | Count |
|---------|-------|
| Global Elements | 5 |
| Countdown Timer | 7 |
| Hero Section | 4 |
| Offer Information | 16 |
| Purchase Modal | 28 |
| Pix Payment Screen | 18 |
| Success Page | 18 |
| Expired Page | 10 |
| Common / Shared | 7 |
| **Total** | **113** |
