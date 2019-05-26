
   
    users = [
        {
            name: 'Oldman',
            password: '1111'
        },
        {
            name: 'ABC',
            password: '2222'
        },
        {
            name: 'Inan Ivanov',
            password: '3333'
        },
        {
           name: 'Alex',
          password: '1111' 
        }
    ];


    var user = document.getElementById('username').textContent;
    localStorage.setItem('tempUser', JSON.stringify(user));


    var logOutBtn = document.getElementById('exit');

    logOutBtn.addEventListener('click', function () {
         modul.setUser("Guest");
        localStorage.setItem('tempUser', JSON.stringify(""));
        var posts = document.getElementById('posts');
        while (posts.firstChild) {
            posts.removeChild(posts.firstChild);
        }
        modul.addAll(photoPosts);

    });


  var signBtn = document.getElementById('reg');
    var signInModal = document.getElementById('signInModal');
    signBtn.addEventListener('click', function () {
        signInModal.style.display = 'block';
    });

    var signINBtn = document.getElementById('signIN');
    signINBtn.addEventListener('click', function () {
        var userName = document.getElementById('login').value;
        var userPassword = document.getElementById('password').value;
        var tempUser = { name: userName, password: userPassword };
        if (users.find(function (x) { return (x.name === userName && x.password === userPassword); })) {
            document.getElementById('wrongData').style.display = 'none';
            tempUser = userName;
            localStorage.setItem('tempUser', JSON.stringify(tempUser));
            signInModal.style.display = 'none';
            modul.setUser(userName);
            var posts = document.getElementById('posts');
            while (posts.firstChild) {
                posts.removeChild(posts.firstChild);
            }
            modul.addAll(photoPosts);
        }
        else {
            document.getElementById('wrongData').style.display = 'block';
        }
    });

    var loadMoreBtn = document.getElementById('view');
    loadMoreBtn.addEventListener('click', function () {
        var posts = document.getElementById('posts');
        var l = posts.childNodes.length + 10;
        var arr = JSON.parse(localStorage.getItem('posts'));
        while (posts.firstChild) {
            posts.removeChild(posts.firstChild);
        }
        var nameFilter = document.getElementById('authorFilter').value;
        var dateFilter1 = document.getElementById('dateFilter1').value;
        var dateFilter2 = document.getElementById('dateFilter2').value;
        var hashtagFilter = document.getElementById('hashtagFilter').value;
        var filterConfig = { author: nameFilter, firstDate: dateFilter1, secondDate: dateFilter2, hashTags: hashtagFilter };

        var photos = list.getPage(0, l, filterConfig);
        for (var i = 0; i < photos.length; i++) {
            View.addPhotoPostToHtml(photos[i]);
        }
        if (l >= arr.length) {
            loadMoreBtn.style.display = "none";
        }
    });


    var filterBtn = document.getElementById('search');
    filterBtn.addEventListener('click', function () {
        var nameFilter = document.getElementById('authorFilter').value;
        var dateFilter1 = document.getElementById('dateFilter1').value;
        var dateFilter2 = document.getElementById('dateFilter2').value;
        var hashtagFilter = document.getElementById('hashtagFilter').value;
        var filterConfig = { author: nameFilter, firstDate: dateFilter1, secondDate: dateFilter2, hashTags: hashtagFilter };
        var posts = document.getElementById('posts');
        var photos = list.getPage(0, 10, filterConfig);
        while (posts.firstChild) {
            posts.removeChild(posts.firstChild);
        }
        if(photos.length===0){           
            loadMoreBtn.style.display = "none";
        }
        else{
            for (var i = 0; i < photos.length; i++) {
                View.addPhotoPostToHtml(photos[i]);
            }
            if (photoPosts.length <= 10) {
                loadMoreBtn.style.display = "none";
            }
        }       
    });

    var edit;
    var editPhoto = document.getElementById('photoModal');
    var editDescr = document.getElementById('shortDescrModal');
    var editHashtags = document.getElementById('hashTagsModal');

    var okEditBtn = document.getElementById('okEdit');
    okEditBtn.addEventListener('click', function () {
        if (View.editOrAdd === 'edit') {
            if (editPhoto.src !== "") {
                modul.editPost(View.idToEdit, {
                    description: editDescr.value,
                    hashTags: editHashtags.value.split(','),
                    photoLink: editPhoto.src
                });
            }
            else {
                modul.editPost(View.idToEdit, {
                    description: editDescr.value,
                    hashTags: editHashtags.value.split(',')
                });
            }
            View.editOrAdd='';
        }
        if (edit === 'add') {            
            modul.addPost( {
                id: new Date().getMilliseconds()-Math.random(),
                description: editDescr.value,
                createdAt: new Date(),
                author: document.getElementById('nameModal').innerText,
                photoLink: editPhoto.src,
                hashTags: editHashtags.value.split(','),
                likes: []
            }); 
            edit='';              
        }
        editModal.style.display = 'none';
    });
    var addPostBtn = document.getElementById('addButton');
    addPostBtn.addEventListener('click', function () {
        edit = 'add';
        document.getElementById('nameModal').textContent = JSON.parse(localStorage.getItem('tempUser'));
        document.getElementById('dateModal').textContent = new Date();
        document.getElementById('photoModal').src = "";
        document.getElementById('shortDescrModal').value = "";
        document.getElementById('hashTagsModal').value = "";
        editModal.style.display = 'block';
    });



    var uploadBtn = document.getElementById('upload');
    var imgURL = document.getElementById('imageURL');
    uploadBtn.addEventListener('click', function () {
        document.getElementById('photoModal').src = imgURL.value;
    });
