// ==UserScript==
// @name         Coupon Extraction and Adding
// @namespace    http://tampermonkey.net/
// @version      2025-12-08
// @description  try to take over the world!
// @author       oumaima
// @match        *://couponscorpion.com/development/resilience4j-with-spring-boot-build-fault-tolerant-systems/
// @match        *://www.udemy.com/course/resilience4j-spring-boot-learnit/?couponCode=DECEMBER_FREE_2025
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    // Wait for page to load
    window.addEventListener('load', function() {
        // Add delay to ensure elements are loaded
        setTimeout(addButtonBeforeOriginal, 1000);
    });

    function addButtonBeforeOriginal() {
        // Find the original link/button element
        const originalLinkSelector = 'div[class="disablemobileborder single_top_postproduct pt20 pb20 border-top border-grey-bottom mb30 flowhidden clearfix"] div:nth-child(2) span a';
        const originalLinkElement = document.querySelector(originalLinkSelector);

        if (!originalLinkElement || !originalLinkElement.href) {
            console.log('Original link element not found');
            return;
        }

        const url = originalLinkElement.href;

        // Create our new button
        const newButton = document.createElement('button');
        newButton.textContent = 'Quick Go to Link';

        // Style the button to look different from the original
        newButton.style.cssText = `
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            margin-right: 10px;
            display: inline-block;
            transition: all 0.3s;
        `;

        // Add hover effect
        newButton.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#218838';
            this.style.transform = 'translateY(-2px)';
        });

        newButton.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#28a745';
            this.style.transform = 'translateY(0)';
        });

        // Add click event
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'Redirecting...';
            this.disabled = true;
            this.style.opacity = '0.8';

            // Redirect after short delay
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        });

        // Insert the new button just before the original link/button
        if (originalLinkElement.parentNode) {
            // Insert before the link element itself
            originalLinkElement.parentNode.insertBefore(newButton, originalLinkElement);
            console.log('Button added before original link. URL:', url);
        } else {
            // Try to insert before the span containing the link
            const spanElement = originalLinkElement.closest('span');
            if (spanElement && spanElement.parentNode) {
                spanElement.parentNode.insertBefore(newButton, spanElement);
                console.log('Button added before span containing link. URL:', url);
            }
        }
    }
})();