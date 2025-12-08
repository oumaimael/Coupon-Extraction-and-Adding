// ==UserScript==
// @name         Simple Coupon Auto-Fill
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add button before existing link, auto-fill coupon on Udemy
// @author       oumaima
// @match        *://couponscorpion.com/development/resilience4j-with-spring-boot-build-fault-tolerant-systems/
// @match        *://www.udemy.com/course/resilience4j-spring-boot-learnit/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function getCouponFromUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('couponCode') ||
                   urlObj.searchParams.get('coupon') ||
                   urlObj.searchParams.get('code');
        } catch(e) {
            return '';
        }
    }


    function addSourcePageButton() {

        const originalLink = document.querySelector('div[class="disablemobileborder single_top_postproduct pt20 pb20 border-top border-grey-bottom mb30 flowhidden clearfix"] div:nth-child(2) span a');

        if (!originalLink || !originalLink.href) return;

        const url = originalLink.href;
        const couponCode = getCouponFromUrl(url);

        const button = document.createElement('button');
        button.textContent = couponCode ? `Use Coupon: ${couponCode}` : 'Go to Course';

        button.style.cssText = `
            padding: 10px 20px;
            background: ${couponCode ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : '#4CAF50'};
            color: ${couponCode ? '#1a1a1a' : 'white'};
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            margin-right: 10px;
            display: inline-block;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;



        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = url;
        });

        if (originalLink.parentNode) {
            originalLink.parentNode.insertBefore(button, originalLink);
        }
    }


    function autoFillUdemyCoupon() {
        
        const couponCode = getCouponFromUrl(window.location.href);
        if (!couponCode) return;

        function fillAndSubmit() {
            
            const couponInput = document.querySelector('div[class="sidebar-container--purchase-section--XWCM-"] input[data-purpose="coupon-input"]');
            const submitButton = document.querySelector('div[class="sidebar-container--purchase-section--XWCM-"] button[data-purpose="coupon-submit"]');

            if (!couponInput || !submitButton) {
                setTimeout(fillAndSubmit, 1000);
                return;
            }

            couponInput.value = couponCode;
            couponInput.style.border = '2px solid #4CAF50';
            couponInput.focus();

            setTimeout(() => {
                if (!submitButton.disabled) {
                    submitButton.click();
                }
            }, 5000);
        }

        setTimeout(fillAndSubmit, 1000);
    }

    function init() {
        if (window.location.href.includes('couponscorpion.com')) {
            addSourcePageButton();
        } else if (window.location.href.includes('udemy.com/course/')) {
            autoFillUdemyCoupon();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();