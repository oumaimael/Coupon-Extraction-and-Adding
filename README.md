Simple Coupon Auto-Fill Tampermonkey Script

Overview:

A lightweight userscript that adds a convenient button before existing links on coupon websites and automatically fills coupon codes on Udemy after a 6-second delay.

Features:

1. On Coupon Websites (couponscorpion.com)

    Adds a styled button before the existing course link

    Displays coupon code if available in the URL

    Visual styling:

        Green gradient for coupons, solid green for no coupon

        Hover effects (lifts up with enhanced shadow)

        Rounded corners and clean typography

    One-click redirect to the Udemy course

2. On Udemy Course Pages

    Extracts coupon code from the browser's URL

    Auto-fills the coupon input field

    Highlights field with green border for visibility

    Waits 6 seconds then automatically submits the coupon

    Handles delayed page loading with retry logic

Installation:

    Install Tampermonkey for your browser

    Create a new script in Tampermonkey

    Copy and paste the entire code

    Save (Ctrl+S or Cmd+S)

Supported Pages:

    couponscorpion.com/development/resilience4j-with-spring-boot-build-fault-tolerant-systems/

    www.udemy.com/course/resilience4j-spring-boot-learnit/* (all variations with coupon parameters)

How It Works:

Source Page Flow:

    Finds the existing course link on the page

    Creates a button with the link

    Places button right before the original link

    Clicking button redirects to Udemy

Udemy Page Flow:

    Extracts coupon from current page URL (e.g., ?couponCode=DECEMBER_FREE_2025)

    Locates coupon input field and submit button

    Fills coupon code and highlights the field

    Waits 5 seconds

    Automatically clicks "Apply" button

Supported Coupon URL Formats:

The script recognizes these URL parameters:

    ?couponCode=CODE

    ?coupon=CODE

    ?code=CODE

Example: https://www.udemy.com/course/resilience4j-spring-boot-learnit/?couponCode=DECEMBER_FREE_2025

Technical Details:

    No external dependencies - pure JavaScript

    Lightweight - minimal code footprint

    Non-intrusive - no popups or overlays

    Error-tolerant - handles missing elements gracefully

    Cross-browser - works in all Tampermonkey-supported browsers

Visual Feedback:

    Udemy field: Green border highlighting (removed after 5 seconds)

    Auto-submit: No visual feedback (silent operation)

Notes

    The 5-second delay allows users to see the filled coupon before automatic submission

    If the submit button is disabled, the script won't force submission

    Works only on the specified URLs for safety and performance

