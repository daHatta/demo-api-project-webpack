"use strict"

// Menu Button
const siteNavi = document.getElementById("mobileBtn");
const navBanner = document.getElementById("navBanner");

siteNavi.addEventListener("click", function(event) {
    navBanner.classList.toggle("mobile");
    let btnMenuLabel = document.querySelector(".btn-menu-label");

    if (navBanner.classList.contains("mobile")) {
        btnMenuLabel.innerHTML = "Close";
    } else {
        btnMenuLabel.innerHTML = "Menu";
    }  
})

// Check menu-class after Window resize
window.addEventListener("resize", function(event) {
    let windowWidth = window.innerWidth;
    let btnMenuLabel = document.querySelector(".btn-menu-label");
    
    if (windowWidth >= 960) {
        navBanner.classList.remove("mobile");
        btnMenuLabel.innerHTML = "Menu";
    }
})

// Go-to-top Button
const toTopBtn = document.getElementById("goToTop");

window.addEventListener("scroll", function(event) {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        toTopBtn.style.display = "block";
    } else {
        toTopBtn.style.display = "none";
    }
});

toTopBtn.addEventListener("click", function(event) {
    window.history.pushState("", document.title, window.location.pathname);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

// Video Accordion via Youtube API
const videoWrapper = document.getElementById("video-list-wrapper");
const channelId = process.env.CHANNEL_ID;
const apiKey = process.env.API_KEY;
const videoSearch = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=12&order=date&key=${apiKey}`;

// Function to get latestVideos
const getLatestFiveVideos = async () => {

    let response;
    let data;
    let videoList = "";
    let errorMessage = "";

    // Error Handling with Fetch API
    try {
    
        response = await fetch(videoSearch);
        
    } catch (error) {

        if (error instanceof SyntaxError) {
            console.log("There was a SyntaxError", error);
        } else {
            console.log("There was an error", error);
        }
    }
    
    if(response?.ok) {
        data = await response.json();    
    } else {
        console.log(`HTTP Response Code: ${response?.status}`)
    }

    if (data) {

        let latestFive = data.items.slice(-5);
    
        latestFive.forEach((video, key) => {
            
            let index = key +1;
            let title = video.snippet.title.split("?");
            let headline = title[0] + "?";
            let author = title[1];
    
            videoList += `
                <div class="video-item">
                    <div class="video-item-header">
                        <h3 id="video-headline-0${index}">
                            <button class="btn video-item-btn" id="video-button-0${index}" aria-expanded="false">
                                <span aria-hidden="true"></span>
                                ${headline}
                            </button>
                        </h3>
                    </div>
                    <div role="region" aria-labelledby="video-headline-0${index}" id="video-region-0${index}" class="video-item-region hidden">
                        <iframe 
                            width="560" 
                            height="315" 
                            src="https://www.youtube.com/embed/${video.id.videoId}"
                            title="YouTube video player"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                        </iframe>
                    </div>
                </div>
            `;
        });

        videoWrapper.innerHTML = videoList;

        activateVideoButtons(videoWrapper);

    } else {

        errorMessage += `
            <div class="videos-error-message">
                <p>
                    Our Videos are currently not available on our site.
                </p>
                <p>
                    We apologize for the technical disruption.
                </p>
                <p>
                    Please use the "More on Youtube"-Button to watch our Videos on our Youtube-channel.
                </p>
            </div>
        `

        videoWrapper.innerHTML = errorMessage;
    }

    // Initialize first video
    showVideo(1);

}

// Function to hide all videos
const hideAllVideos = () => {

    for (var i=1; i<6; i++) {
        let videoButton = document.getElementById("video-button-0" + i);
        let videoButtonIcon = document.querySelector("#video-button-0" + i + " span");
        let videoRegion = document.getElementById("video-region-0" + i);
        videoButton.setAttribute("aria-expanded", "false");
        videoButtonIcon.setAttribute("aria-hidden", "true");
        videoRegion.classList.replace("active", "hidden");
    }

}

// Function to show specific video
const showVideo = (item) => {

    hideAllVideos();

    let activeButton = document.getElementById("video-button-0" + item);
    let activeButtonIcon = document.querySelector("#video-button-0" + item + " span");
    let activeRegion = document.getElementById("video-region-0" + item);
    activeButton.setAttribute("aria-expanded", "true");
    activeButtonIcon.setAttribute("aria-hidden", "false");
    activeRegion.classList.replace("hidden", "active");

}

// Function to activate video buttons
const activateVideoButtons = (base) => {

    let listVideoButtons = base.querySelectorAll("button.video-item-btn");

    listVideoButtons.forEach((button, key) => {
        let index = key + 1;
        button.addEventListener('click', () => {
            showVideo(index);
        });
    });

}

// Call youtube videos 
getLatestFiveVideos();

// Generic form validation based on
// https://github.com/codebubb/javascript-form-validation-tutorial/blob/main/script.js
const  validateForm = (formId) => {
    // Selects form by ID
    const formElement = document.querySelector(formId);

    // No browser validation
    formElement.setAttribute("novalidate", "");

    // Eventlistener on form
    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        validateAllFields(formElement);
    })

    // Function to validate all fields
    const validateAllFields = (formToValidate) => {
        const fields = Array.from(formToValidate.querySelectorAll(".field-box"));

        fields.forEach((field) => {
            validateSingleField(field);
        })
    }

    // Options for validation
    const validationOptions = [
        {
            attribute: "data-pattern",
            isValid: (input) => {
                const messageLines = input.value.split("\n");
                const regExPattern = new RegExp(input.dataset.pattern);
                
                for (var i = 0; i < messageLines.length; i++) {
                    if (!regExPattern.test(messageLines[i])) {
                        return false;
                    };
                }
                return true;
            },
            errorMessage: (input, label) => `Your ${label.textContent} contains illegal characters, like <, >, $`
        },
        {
            attribute: "pattern",
            isValid: (input) => {
                const regExPattern = new RegExp(input.pattern);
                return regExPattern.test(input.value); // returns true or false
            },
            errorMessage: (input, label) => `Your ${label.textContent} contains illegal characters or a wrong format.`
        },
        {
            attribute: "minlength",
            isValid: (input) => input.value && input.value.length >= parseInt(input.minLength, 10),
            errorMessage: (input, label) => `Your ${label.textContent} needs to be longer than ${parseInt(input.minLength)} character.`
        },
        {
            attribute: "required",
            isValid: (input) => input.value.trim() !== "",
            errorMessage: (input, label) => `Your ${label.textContent} is required.`
        }
    ]

    // Function to validate a single field
    const validateSingleField = (fieldToValidate) => {
        const label = fieldToValidate.querySelector("label");
        const input = fieldToValidate.querySelector("input, textarea");
        const validIcon = fieldToValidate.querySelector(".valid");
        const invalidIcon = fieldToValidate.querySelector(".invalid");
        const errorMessage = fieldToValidate.querySelector(".error-message");

        let fieldError = false;
        for(const option of validationOptions) {
            if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
                errorMessage.textContent = option.errorMessage(input, label);
                invalidIcon.classList.remove("hidden");
                validIcon.classList.add("hidden");
                fieldError = true;
            }
        }

        if (!fieldError) {
            errorMessage.textContent = "";
            invalidIcon.classList.add("hidden");
            validIcon.classList.remove("hidden");
        }
    }
}

// Call validate function
validateForm("#contact-form");

// Reset fields of form
const resetForm = (formId) => {

    // Getting form and reset button
    const formElement = document.querySelector(formId);
    const resetButton = formElement.querySelector("[type='reset']");

    // Eventlistener on reset button of form
    resetButton.addEventListener("click", (event) => {
        resetAllFields(formElement);
    })

    // Function to reset all fields
    const resetAllFields = (formToReset) => {
        const fields = Array.from(formToReset.querySelectorAll(".field-box"));

        fields.forEach((field) => {
            resetSingleField(field);
        })
    }

    // Function to reset a single field
    const resetSingleField = (fieldToReset) => {
        const validIcon = fieldToReset.querySelector(".valid");
        const invalidIcon = fieldToReset.querySelector(".invalid");
        const errorMessage = fieldToReset.querySelector(".error-message");

        validIcon.classList.add("hidden");
        invalidIcon.classList.add("hidden");
        errorMessage.textContent = "";
    }
}

// Call reset function
resetForm("#contact-form");

