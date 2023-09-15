function retriveData(){
    
    fetch('profile_retrive.php').then(response => response.json()).then(data => {
        // Use the JSON data
        console.log(data);
        console.log('loaded');
        var i = data[0];

        var html = `<button class="btn icon-btn" id="edit"><span class="material-symbols-rounded"> edit </span></button>
            <div class="upper text-white">
                <div class="profile-img">
                    <img src="./img/${i.image}" id="profile">
                    <button class="btn icon-btn" id="addaphoto"><span class="material-symbols-rounded"> add_a_photo </span></button>
                </div>
                <ul class="social-link" type="none">
                    <li>
                        <img src="./img/icons/linkedin.png" />
                        <input type="url" id="linkedIn" />
                    </li>
                    <li>
                        <img src="./img/icons/github.png" />
                        <input type="url" id="gitHub" />
                    </li>
                    <li>
                        <img src="./img/icons/behance.png" />
                        <input type="url" id="behance" />
                    </li>
                </ul>
            </div>
            <div class="flex-columns">
                <form method="post" class="details-form" action="submit.php" >
                    <div class="form-group">
                        <input type="text" id="name" name="name" value="${i.name}" placeholder=" ">
                        <label for="name">Name</label>
                    </div>
                    <div class="form-group">
                        <input type="text" id="designation" name="designation" value="${i.designation}" placeholder=" ">   
                        <label for="designation">Designation</label>
                    </div>
                    <div class="form-group">
                        <input type="text" id="company" name="company" value="${i.company}" placeholder=" ">
                        <label for="company">Organisation</label>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" value="${i.email}" placeholder="Email">
                        <label for="email">Email</label>
                    </div>
                    <div class="form-group">
                        <input type="text" id="location" name="location" value="${i.location}" placeholder=" ">  
                        <label for="location">Location</label>
                    </div>
                    <input id="image" name="image" value="${i.image}" type="file" accept="image/*" style="display: none;"/>
                    <div class="submit">
                        <input type="button" value="cancel" class="btn" id="cancel">
                        <input type="submit" value="Submit" class="btn btn-blue" id="submit">
                    </div>
                </form>
                <div class="details">
                    <ul class="contact p-0 m-0" type="none">
                        <li>
                            <h2 class="m-0">${i.name}</h2>
                            <p class="desc">${i.designation}</p>
                        </li>
                        <li><span class="material-symbols-rounded"> location_on </span>${i.location}</li>
                        <li><span class="material-symbols-rounded"> corporate_fare </span>${i.company}</>
                        <li><span class="material-symbols-rounded"> mail </span>${i.email}</li>
                    </ul>
                    <div class="social-media">
                        <ul type="none">
                            <li><a href="${i.linkedin}"><img src="./img/icons/linkedin.png"></a></li>
                            <li><a href="${i.github}"><img src="./img/icons/github.png"></a></li>
                            <li><a href="${i.behance}"><img src="./img/icons/behance.png"></a></li>
                        </ul>
                    </div>

                </div>
            </div>`;
            
        $('#app').html(html);

    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });
}



$(window).on('load', function(){

    retriveData();
    $('#edit').on('click', function(){
        $('#app').addClass('active');
    });
    
    $('#cancel').on('click', function(){
        $('#app').removeClass('active');
    });
    $('#submit').on('click', function(e){
        e.preventDefault();
        $('#app').removeClass('active');
        retriveData();
    });
    
    $('#addaphoto').on('click', function(){
        $('#image').click();
    });

    $('#image').on('input', function(e){
        var files = e.target.files;
        $('#profile').attr('src', './img/'+files[0].name);
    });

});
