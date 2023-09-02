function enlargeHeart() {
    const heartIcon = document.getElementById('heart-icon');
    const greeting = document.getElementById('greeting');
 

    // Ubah ukuran dan posisi ikon hati
    heartIcon.style.transform = 'scale(100)';  // Ubah dari scale(50) menjadi scale(100)
    heartIcon.style.top = '50%';
    heartIcon.style.left = '50%';
    heartIcon.style.transform += ' translate(-50%, -50%)';
    heartIcon.style.transform = 'scale(100)';

    // Ubah warna latar belakang body
     

    // Sembunyikan teks "klik hatinya..."
    greeting.style.display = 'none';


    // Hapus event listener
    heartIcon.onclick = null;

    
    showConsent();
}

function createFallingHeart() {
    const heart = document.createElement("i");
    heart.classList.add("fas", "fa-heart", "falling-heart");

    // Posisi hati secara acak di layar
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 4 + 9 + "s"; // durasi antara 3-5 detik

    document.body.appendChild(heart);

    // Hapus hati dari DOM setelah animasi selesai
    heart.addEventListener("animationend", () => {
        heart.remove();
    });
}


function startFallingHearts() {
    let fallingHeartsInterval;
    if(!fallingHeartsInterval) {  // Memastikan tidak ada interval yang berjalan
        fallingHeartsInterval = setInterval(createFallingHeart, 300);
    }
}

function stopFallingHearts() {
    if(fallingHeartsInterval) {
        clearInterval(fallingHeartsInterval);
        fallingHeartsInterval = null;  
    }
}

function showConsent() {
    const consentDiv = document.getElementById('consent');
    consentDiv.style.display = 'block';  // Menampilkan div persetujuan
}

function declineConsent() {
    const button = document.getElementById('declineButton');
    const consentDiv = document.querySelector('.consent');
    
    // Ambil informasi mengenai dimensi dan posisi elemen .consent
    const consentRect = consentDiv.getBoundingClientRect();

    // Batas posisi acak untuk tombol agar tetap berada dalam elemen .consent
    const maxX = consentRect.left + consentRect.width - button.offsetWidth;
    const maxY = consentRect.top + consentRect.height - button.offsetHeight;
    
    const minX = consentRect.left;
    const minY = consentRect.top;
    
    // Generate posisi acak dengan mempertimbangkan batas
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    button.style.position = 'absolute'; 
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

const sentences = `
kita sudah kenal lama,
dan aku tau semuanya tentang kamu,
tanggal lahir kamu,
hobi kamu,
bahkan aku tau apa saja yang ga kamu suka,
kadang kamu badmood ga jelas,
tapi entah kenapa...,
aku ga bisa marah,
sama sikap kamu,
dan selama sama kamu,
aku bahagia bgt,
jika mau digambarkan sukanya aku ke kamu,
seperti💗 yang kamu lihat sekarang,
tak terhingga,
jadi aku mau jujur sama kamu,
aku SAYANG kamu,
kamu gimana?,
kamu juga rasakan yang sama juga ga?,
mungkin kamu masih ragu ya?,
aku bisa buktikan,
kamu dan aku tuh jodoh,
pilih salah satu
dari 5 hati ini.
ada 1 ❤️ dan 4 💔
`.trim().split(',');
/*

*/


function displaySentences() {
    
    const optionsContainer = document.querySelector(".options-container");
    const sentencesContainer = document.createElement("div");
    sentencesContainer.classList.add("sentences-container");
    const textDisplay = document.createElement("p"); 
    textDisplay.classList.add("sentence-text");
    
    sentencesContainer.appendChild(textDisplay);
    optionsContainer.appendChild(sentencesContainer);

    let delay = 0;
    const delayIncrement = 4000;

    sentences.forEach((sentence, index) => {
        setTimeout(() => {
            textDisplay.style.opacity = 0; 
            textDisplay.style.transform = 'scale(1)';

            setTimeout(() => {
                textDisplay.textContent = sentence.trim();
                textDisplay.style.opacity = 1; 
                textDisplay.style.transform = 'scale(1.1)';
            }, 500);
        }, delay);
        delay += delayIncrement;
    });

    // Menampilkan heart-group setelah semua kalimat ditampilkan
    setTimeout(() => {
        displayForm();
        displayHeartGroup();
    }, delay);
}

function showOptions() {
    const consentDiv = document.getElementById('consent');
    const optionsContainer = document.createElement("div");
    const audio = document.getElementById('audio');
    const videoBg = document.createElement("video");

    videoBg.setAttribute("src", "video.mp4"); // Ganti dengan path ke video Anda
    videoBg.setAttribute("autoplay", ""); // Untuk autoplay video
    videoBg.setAttribute("loop", "");     // Untuk mengulang video
    videoBg.setAttribute("muted", "");   // Untuk menghilangkan suara
    videoBg.classList.add("video-background"); // Tambahkan kelas untuk styling
    document.body.insertBefore(videoBg, document.body.firstChild); // Tempatkan sebagai elemen pertama di body

    optionsContainer.classList.add("options-container");
    
    audio.loop = true; 
    audio.play();
    
    const text = document.createElement("p");
    text.textContent = "Ada yang mau aku omongin...";
    
    optionsContainer.appendChild(text);

    setTimeout(() => {
        // button iya
        const yesButton = document.createElement("button");
        let clickCount = 0; // Variabel untuk menghitung jumlah klik
        yesButton.textContent = "iya apa?";
        yesButton.classList.add("option-button", "yes-button");
        yesButton.addEventListener("click", () => {
            text.remove(); 
            yesButton.remove(); 
            noButton.remove(); 
            // clearInterval(fallingHeartsInterval);
            displaySentences(sentences);
            startFallingHearts(); 
            
        });

        // button tidak
        const noButton = document.createElement("button");
        noButton.textContent = "ga dulu ya";
        noButton.classList.add("option-button", "no-button");
        
        let noButtonClickListener = function() {
            clickCount++;
            
            if (clickCount >= 1) {
                noButton.removeEventListener('click', noButtonClickListener); // Hapus event listener lama
                
                noButton.textContent = "iya apa? 😂"; // Ubah teks tombol
                noButton.classList.remove("no-button");
                noButton.classList.add("yes-button");
                
                noButton.addEventListener('click', () => {
                    text.remove();
                    yesButton.remove();
                    noButton.remove();
                    startFallingHearts();
                    displaySentences(sentences);
                });
        
                return;
            }
        
            const anotherNoButton = document.createElement("button");
            anotherNoButton.textContent = "ga dulu ya";
            anotherNoButton.classList.add("option-button", "no-button");
            anotherNoButton.addEventListener('mouseover', moveButton);
            optionsContainer.appendChild(anotherNoButton);
        };
        
        noButton.addEventListener('click', noButtonClickListener);
        
        optionsContainer.appendChild(yesButton);
        optionsContainer.appendChild(noButton);
    }, 2000);

    document.body.appendChild(optionsContainer);
    consentDiv.style.display = 'none';  // Sembunyikan div persetujuan saat menampilkan opsi baru
}


function moveButton() {
    const button = document.querySelector('.option-button');
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    // Buat posisi acak untuk tombol
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

function addClickableHearts() {
    const optionsContainer = document.querySelector(".options-container");
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement("i");
        heart.classList.add("fas", "fa-heart", "heart-icon");
        heart.style.border = "3px solid white";
        heart.style.margin = "10px";
        heart.style.padding = "5px";
        heart.style.cursor = "pointer";
        heart.onclick = enlargeHeart;  // Menggunakan fungsi enlargeHeart yang sudah ada

        optionsContainer.appendChild(heart);
    }
}


function enlargeGroupHeart(heartElement) {
    // Tindakan apa yang ingin Anda lakukan ketika salah satu hati di heart-group diklik
    heartElement.style.transform = 'scale(1.5)';  // Contoh: perbesar ikon hati
    heartElement.style.transition = 'transform 1s';
    // Anda dapat menambahkan lebih banyak tindakan di sini sesuai keinginan Anda
}


function displayHeartGroup() {
    const heartGroup = document.getElementById("heart-group");
    const currentDateTime = getCurrentDateTime();
    const messages = ["tuh kita jodohkan ❤️", "sekarang kita sudah jadian", "tgl jadian kita: " + currentDateTime, "sesuai janji SS & share", "ke SW/SG ya 🥰"];
    const h4Element = document.createElement('h4');

    // h4Element.textContent = "Tk:@sinatraGi | ig:@gii_S21";
    h4Element.classList.add("h4-social-media");


    // Hapus semua child elements dari heartGroup
    while (heartGroup.firstChild) {
        heartGroup.removeChild(heartGroup.lastChild);
    }

    // Tentukan secara acak hati mana yang akan menjadi "special"
    const specialHeartNumber = Math.floor(Math.random() * 5) + 1; // ini akan memberikan angka acak antara 1 sampai 5

    for (let i = 1; i <= 5; i++) {
        const heartIcon = document.createElement("i");
        heartIcon.className = "fas fa-heart heart-icon";
        
        // Jika i sama dengan specialHeartNumber, tandai hati ini sebagai "special"
        if (i === specialHeartNumber) {
            heartIcon.id = "heart-icon-special";
        } else {
            heartIcon.id = `heart-icon-${i}`;
        }

        heartIcon.onclick = function() {
            setTimeout(() => {
                if (this.id === "heart-icon-special") {
                    showMessage(["kita ga jodoh ya 💔", "sesuai janji share", "ke SW/SG ya 😞"], false);
                } else {
                    showMessage(messages, true);
                }
            },500);  
        };

        heartGroup.appendChild(heartIcon);
    }
      
    heartGroup.style.display = "flex";
    heartGroup.insertAdjacentElement('afterend', h4Element);
}


function showMessage(messages, isPositive) {
    const combinedMessage = messages.join('<br>');  // Menggabungkan semua pesan dengan elemen <br> di antaranya

    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = combinedMessage;  // Gunakan innerHTML agar elemen <br> diterjemahkan dengan benar
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '75%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.padding = '20px';
    messageDiv.style.borderRadius = '15px';
    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    messageDiv.style.color = 'white';
    messageDiv.style.fontSize = '20px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.textAlign = 'center';
    
    if (isPositive) {
        messageDiv.style.borderColor = 'pink';
    } else {
        messageDiv.style.borderColor = 'red';
    }

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();  // Hapus div setelah waktu tertentu
    }, 30000);  // Misalnya 10 detik
}

function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
}

function displayForm() {
    const formWrapper = document.createElement('div');
    formWrapper.classList.add('form-above-hearts', 'transparent-background'); // tambahkan class 'form-above-hearts' di sini

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "isi inisial nama pengirim web ini");
    nameInput.classList.add("input-text");  // Tambahkan kelas input-text
    nameInput.style.marginBottom ="2px";
    
    const messageInput = document.createElement("input");
    messageInput.setAttribute("type", "text");
    messageInput.setAttribute("placeholder", "isi inisial nama kamu");
    messageInput.classList.add("input-text");  // Tambahkan kelas input-text
    
    formWrapper.appendChild(nameInput);
    formWrapper.appendChild(messageInput);
    

    document.body.appendChild(formWrapper);
}

