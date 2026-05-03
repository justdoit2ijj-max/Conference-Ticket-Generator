const avatar = document.getElementById('avatar');
const avatarLabel = document.getElementById('avatar-label');
const AvatarPreview = document.getElementById('avatar-preview');
const message = document.getElementById('avatar-message');
const info = document.getElementById('avatar-info');
const buttonContainer = document.getElementById('button-container');
const defaultAvatarSrc = AvatarPreview.src;
const submitBtn = document.getElementById('submit');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const githubUsername = document.getElementById('github-username');
const firstMain = document.getElementById('first-main');
const firstHeader = document.getElementById('first-header');
const secondMain = document.getElementById('second-main')
const secondHeader = document.getElementById('second-header')
const nameOutput = document.querySelectorAll('.name-output');
const emailOutput = document.getElementById('email-output');
const imgOutput = document.getElementById('img-output');
const githubUsernameOutput = document.getElementById('github-username-output');

avatarLabel.addEventListener('dragover', (e) => {
    e.preventDefault();
    avatarLabel.classList.add("border-orange-500");
});
avatarLabel.addEventListener('dragleave', (e) => {
    e.preventDefault();
    avatarLabel.classList.remove("border-orange-500");
});
avatarLabel.addEventListener('drop', (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    handlefiles(file);
});
avatar.addEventListener('change', (e) => {
    let file = e.target.files[0];
    handlefiles(file);
});
function handlefiles(file) {
    if (!file) return;

    if (file.size <= 500 * 1024 && (file.type === "image/png" || file.type === "image/jpeg")) {
        showpreview(file);
        ChangeOrDelete();
        message.textContent = "Upload Your photo (JPG or PNG, max size: 500Kb)";
        message.style.color = "";
    } else {
        message.textContent = "Image is either not PNG or JPG or bigger than 500Kb";
        message.style.color = "red";
        avatar.value = "";
    }
};
function showpreview(file) {
    let url = URL.createObjectURL(file);
    AvatarPreview.src = url;
    AvatarPreview.style.height = "3rem";
    AvatarPreview.style.width = "3rem";
};
function ChangeOrDelete() {
    buttonContainer.innerHTML = "";
    info.style.display = "none";

    let delBtn = document.createElement("button");
    buttonContainer.appendChild(delBtn);
    delBtn.classList.add("text-neutral-300", "cursor-pointer", "border", "border-neutral-50", "border-1", "rounded-md", "bg-neutral-50/50", "px-2", "text-neutral-950");
    delBtn.type = "button";
    delBtn.textContent = "Delete image";

    let changeBtn = document.createElement("button")
    buttonContainer.appendChild(changeBtn);
    changeBtn.classList.add("text-neutral-300", "cursor-pointer", "border", "border-neutral-50", "border-1", "rounded-md", "bg-neutral-50/50", "px-2", "text-neutral-950");
    changeBtn.type = "button";
    changeBtn.textContent = "Change Image"

    delBtn.addEventListener('click', deleteImage);
    changeBtn.addEventListener('click', changeImage)
};
function deleteImage(e) {
    e.preventDefault();
    avatar.value = "";
    AvatarPreview.src = defaultAvatarSrc;
    AvatarPreview.style.height = "";
    AvatarPreview.style.width = "";
    info.style.display = "";
    buttonContainer.innerHTML = "";
}
function changeImage(e) {
    e.preventDefault();
    avatar.click();
}

submitBtn.addEventListener('click', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        message.textContent = "Please enter a valid email address";
        message.style.color = "red";
        return;
    }
    
    let gitUser = githubUsername.value.trim();
    if (!gitUser.startsWith('@')) {
        message.textContent = "GitHub username should start with @";
        message.style.color = "red";
        return;
    }
    
    if (avatar.value === "" || fullName.value.trim() === "" || email.value.trim() === "" || githubUsername.value.trim() === "") {
        message.textContent = "Please fill in all fields and upload an avatar";
        message.style.color = "red";
    } else {
        firstMain.style.display = "none";
        firstHeader.style.display = "none";
        secondMain.style.display = "flex";
        secondMain.style.justifyContent = "center";
        secondMain.style.alignItems = "center";
        secondHeader.style.display = "flex";
        
        nameOutput.forEach(output => {
            output.textContent = fullName.value;
        });
        emailOutput.textContent = email.value;
        githubUsernameOutput.textContent = githubUsername.value;
        imgOutput.src = AvatarPreview.src;
    }
});