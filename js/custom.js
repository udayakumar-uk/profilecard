// Firebase server
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, update, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyAP__vHa-sc89gKf2llzjQ54D44VK-0z9w",
  authDomain: "profile-card-1ae9b.firebaseapp.com",
  projectId: "profile-card-1ae9b",
  storageBucket: "profile-card-1ae9b.appspot.com",
  messagingSenderId: "652853710977",
  appId: "1:652853710977:web:c74459ec437d2415d43d80",
  measurementId: "G-2MCBF08DCH"
};

const appSettings = {
    databaseURL: "https://my-databash-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

var init = initializeApp(appSettings);
var db = getDatabase();
// const db = getDatabase(init);
var setDb = ref(db, 'profilecard');

var profileData = {
    name: 'Udaya',
    designation: 'Developer',
    company: 'Google',
    email: '123@gmail.com',
    location: 'Chennai',
    social: {
        image: 'photo-4.png',
        linkedin: 'link 1',
        github: 'link 2',
        behance: 'link 3'
    }
}

const limit = 10;
var imgitem = [];

var folder = "img/";

function fetchAllAvatars(){
    imgitem = [];    
    $.ajax({
        url : folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if( val.match(/jpe?g$|png$|gif$/i) ) { 
                    imgitem.push(val);
                } 
            });
            var html = imgitem.map(el => '<li class="imageList" title="'+el+'"><img src="img/'+el+'" />&nbsp; <span class="text-truncate">'+el+'</span><span class="material-symbols-rounded dltImg" imgsrc="'+el+'"> delete </span></li>');
            $('#appendList').html(html);
            console.log(imgitem);

            if(imgitem.length < 1){
                updateEmtyImg('icons/avatar.jpg');
            }

            $('.dltImg').on('click', function(e){
                var el = $(this).attr('imgsrc');
                removeImage(el)
                e.stopPropagation();
            });


            $('.imageList').on('click', function(e){
                var el = $(this).attr('title');
                $('#profile').attr('src', 'img/'+el);
                profileData.social.image = el;
            });
        }
    });

}

function removeImage(img){
                    
    $.ajax({
        url: "upload_profile.php?remove_image=" + img,
        type: "POST",
        data: img,
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
            fetchAllAvatars();
        }
    });
}


function updateProfile(data){
    set(ref(db, 'profilecard/'), data);
}

function updateEmtyImg(data){
    $('#profile').attr('src', 'img/'+data);
    set(ref(db, 'profilecard/social/image'), data);
}

// fetching all data
onValue(setDb, (snapshot) => {
    const data = snapshot.val();
    profileData = data;
    console.log(data);
    retriveData(profileData);
});




function retriveData(data){

    var html = `<button class="btn icon-btn" id="edit"><span class="material-symbols-rounded"> edit </span></button>
        <div class="upper text-white">
            <div class="profile-dropdown">
                <div class="profile-img">
                    <img src="./img/${data.social.image}" id="profile">
                    <button class="btn icon-btn" id="addaphoto"><span class="material-symbols-rounded"> add_a_photo </span><span>or<br> Drag and <br> Drop</span></button>
                </div>
                <div class="dropdown">
                    <button class="btn" id="dropdown_toggle">Select Avatar<span class="material-symbols-rounded"> keyboard_arrow_down </span></button>
                    <ul id="appendList" type="none" style="display: none"></ul>
                </div>
            </div>
            <ul class="social-link" type="none">
                <li>
                    <img src="./img/icons/linkedin.png" />
                    <input type="url" name="linkedin" id="linkedIn" value="${data.social.linkedin}"/>
                </li>
                <li>
                    <img src="./img/icons/github.png" />
                    <input type="url" name="github" id="gitHub" value="${data.social.github}"/>
                </li>
                <li>
                    <img src="./img/icons/behance.png" />
                    <input type="url" name="behance" id="behance" value="${data.social.behance}"/>
                </li>
            </ul>
        </div>
        <div class="flex-columns">
            <input id="image" name="image" value="${data.social.image}" type="file" accept="image/*" hidden/>
            <form class="details-form" id="formSubmit">
                <div class="form-group">
                    <input type="text" id="name" name="name" value="${data.name}" placeholder=" ">
                    <label for="name">Name</label>
                </div>
                <div class="form-group">
                    <input type="text" id="designation" name="designation" value="${data.designation}" placeholder=" ">   
                    <label for="designation">Designation</label>
                </div>
                <div class="form-group">
                    <input type="text" id="company" name="company" value="${data.company}" placeholder=" ">
                    <label for="company">Organisation</label>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" value="${data.email}" placeholder="Email">
                    <label for="email">Email</label>
                </div>
                <div class="form-group">
                    <input type="text" id="location" name="location" value="${data.location}" placeholder=" ">  
                    <label for="location">Location</label>
                </div>
                <div class="submit">
                    <input type="button" value="cancel" class="btn" id="cancel">
                    <input type="submit" value="Submit" class="btn btn-blue" id="submitBtn">
                </div>
            </form>
            <div class="details">
                <ul class="contact p-0 m-0" type="none">
                    <li>
                        <h2 class="m-0">${data.name}</h2>
                        <p class="desc">${data.designation}</p>
                    </li>
                    <li><span class="material-symbols-rounded"> location_on </span>${data.location}</li>
                    <li><span class="material-symbols-rounded"> corporate_fare </span>${data.company}</>
                    <li><span class="material-symbols-rounded"> mail </span>${data.email}</li>
                </ul>
                <div class="social-media">
                    <ul type="none">
                        <li><a style="display: ${data.social.linkedin ? 'block' : 'none'}" target="_blank" href="${data.social.linkedin}"><img src="./img/icons/linkedin.png"></a></li>
                        <li><a style="display: ${data.social.github ? 'block' : 'none'}" target="_blank" href="${data.social.github}"><img src="./img/icons/github.png"></a></li>
                        <li><a style="display: ${data.social.behance ? 'block' : 'none'}" target="_blank" href="${data.social.behance}"><img src="./img/icons/behance.png"></a></li>
                    </ul>
                </div>

            </div>
        </div>`;
        
    $('#app').html(html);



    fetchAllAvatars();


    // Events

    $('#profile').on('error', function(){ 
        updateEmtyImg('icons/avatar.jpg');
    })

    $('#dropdown_toggle').on('click', function(e){
        $('#appendList').fadeToggle();
        e.stopPropagation()
    });

    $(document).on('click', function(){
        $('#appendList').fadeOut();
    });

    $('#edit').on('click', function(){
        $('#app').addClass('active');
    });

    $('#cancel').on('click', function(){
        onValue(setDb, (snapshot) => {
            const data = snapshot.val();
            profileData.social.image = data.social.image;
        });
        $('#profile').attr('src', 'img/'+profileData.social.image);
        console.log(profileData);

        $('#app').removeClass('active');
    });

    $('#linkedIn, #gitHub, #behance, #image').on('change', function(e) {
        const {name, value, files} = e.target;
        profileData.social = {
            ...profileData.social,
            [name]: name === 'image' ? files[0].name : value
        }
        console.log(profileData);
    });
    


    $('#formSubmit').on('submit', function(e) {
        e.preventDefault();
        $('#app').removeClass('active');

        var formData = e.target.elements;

        for(let i=0; i < formData.length; i++){
            const {name, value} = formData[i];
            if(name){
                profileData = {
                    ...profileData,
                    [name]: value
                }
            }
        }
        updateProfile(profileData);
    });




    $('#addaphoto').on('click', function(){
        $('#image').click();
    });

    $('#image').on('input', function(e){
        var files = e.target.files;
        if(limit > imgitem.length){
            $('#profile').attr('src', './img/'+files[0].name);
            createFormData(files);
            e.stopPropagation();
        }else{
            alert("Upload limit reached: 10 avatars max. Delete one to add more.");
            $('#dropdown_toggle').click();
        }
    });

    $("#addaphoto").on('dragover', function (e) {
        e.preventDefault();
        $(this).css('background', '#fff3');
    });

    $("#addaphoto").on('drop', function (e) {
        e.preventDefault();
        $(this).css('background', '#0005');
        if(limit > imgitem.length){
            var image = e.originalEvent.dataTransfer.files;
            createFormData(image);
        }else{
            alert("Upload limit reached: 10 avatars max. Delete one to add more.");
            $('#dropdown_toggle').click();
        }
        // You can upload limit 10 avatar, 

    });

    function chooseImg(img){
        console.log(img);
    }

    function createFormData(image) {
        var formImage = new FormData();
        formImage.append('userImage', image[0]);
        uploadFormData(formImage);
    }
    
    function uploadFormData(formData) {
        $.ajax({
            url: "./upload_profile.php",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {

                $('#profile').attr('src', './img/'+data.trim());
                profileData.social.image = data.trim();
                fetchAllAvatars();
                console.log(data);

            }
        });
    }

}
