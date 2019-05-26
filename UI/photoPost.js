const modul = (function () {
    return {
        setUser(name) {
            list._user = name;
            View.setUser(list._user);
           
        },
        addAll(posts) {
            const error = list.addAll(posts);
            View.showPosts(list.getPage(0, 10 - error.length));
            View.addAuthors(posts);
        },
        removePost(id) {
            if (list.remove(id)) {
                View.removePost(id);
            }
        },
        editPost(id, post) {
            if (list.edit(id, post)) {
                View.editPost(id, post);
            }
        },
        addPost(post) {
            if (list.add(post))
                View.addPost(post);
           
        }
    }
})();

class PostList {
    _posts;
    _user;

    

    constructor(postsList = [],user) {
        this._posts = postsList.slice();
        this._user = user;
    }

    clear() {
        this._posts = [];
        this._user="";
    }

    addAll(posts) {
        if (posts) {
            var photos = this;
            var error = [];
            posts.forEach(function (item) {
                if (!photos.add(item)) {
                    error.push(item);
                }
            });
            return error;
        }
        return posts;
    }

     save() {
        localStorage.setItem('posts', JSON.stringify(this._posts));
    }

    restore() {
        if (!localStorage.getItem('posts')) {
            localStorage.clear();
            localStorage.setItem('posts', JSON.stringify(this._posts));
        }
    }

     static _validator={
         description: function(description){
            const MIN=10;
            const MAX=200;
             if(description.length>=MIN && description.length<=MAX && typeof description!= "undefined"){
                 return true;
             } else{
                 return false;
             }
         },
         photoLink: function(photoLink){
            if(photoLink!==null && typeof photoLink!= "undefined"){
                return true;
            } else {
                return false;
            }
         }
    }

    static validate(photoPost){
       
       if(this._validator.description(photoPost.description) && this._validator.photoLink(photoPost.photoLink)){
       	return true;
      } else { 
          return false;
      }
    }  
    add(photoPost){
    	photoPost.id=new Date().getMilliseconds()-Math.random();
    	photoPost.createdAt=new Date();
       // photoPost.author=this._user;
       if(PostList.validate(photoPost)){
           photoPost.likes=[];
           this._posts.push(photoPost);
           this.save();
           return true;
       } else {
           return false;
       }
    }

    get(id){
        return this._posts.find(function(item){
            return item.id==id;
        });
    }

    

     getPage(skip, top, filterConfig) {
        var toShow = this._posts;

        skip = skip || 0;
        top = top || 10;

        if (!filterConfig) {
            toShow.sort(PostList.compareTo);
            return toShow.slice(skip, skip + top);
        }

        if (filterConfig) {
            if (filterConfig.author) {
                toShow = toShow.filter(function (x) { return x.author === filterConfig.author; });
            }
            if (filterConfig.createdAt) {
                toShow = toShow.filter(function (x) { return (x.createdAt.substr(0, 10) === filterConfig.createdAt); });
            }
            if (filterConfig.hashTags) {
                toShow = toShow.filter(function (x) {
                    return x.hashTags.indexOf(filterConfig.hashTags) !== -1;
                });
            }
            toShow.sort(PostList.compareTo);
            return toShow.slice(skip, skip + top);
        }
    }


    remove(id){
       for(var i=0;i<photoPosts.length;i++){
            if(photoPosts[i].id===id){
                      photoPosts.splice(i,1);
                      this.save;
                      return true;
                      }
        }
       return false;
    }

    edit(id,photoPost){
       var postToEdit=this.get(id);
    	if(PostList.validate(postToEdit)){            
            if(photoPost.photoLink!==null && typeof photoPost.photoLink!= "undefined"){
                postToEdit.photoLink=photoPost.photoLink;
            }
            if(photoPost.description!==null && typeof photoPost.description!= "undefined" ){
                postToEdit.description=photoPost.description;
            }
            if(photoPost.hashTags!==null && typeof photoPost.hashTags!= "undefined"){
                postToEdit.hashTags=photoPost.hashTags;
            }
            this.save();
            return true;
            } else {
             	return false;
                         
        }
    }    
    like(user,id){
        if(this.get(id).likes.indexOf(user)==-1){
            this.get(id).likes.push(user);
        }
    }
}

var photoPosts = [
/*{
    id: '1',
    description: 'Best description ever №1',
    createdAt: new Date('2018-02-23T22:00:00'),
    author: 'Inan Ivanov',
    hashTags:['#abc','#rty','#uio'],
    likes:['Inan Ivanov','QWERTY','ABC'],
    photoLink: 'https://images.wallpaperscraft.ru/image/sobaka_kraska_bryzgi_morda_65140_2560x1600.jpg'
    },
    {
    id: '2',
    description: 'Best description ever №2',
    createdAt: new Date('2017-02-23T23:00:00'),
    author: 'ABC',
    hashTags:['#qwe','#rty','#uio'],
    likes:[],
    photoLink: 'https://avatars.mds.yandex.net/get-pdb/1357142/48d07be0-c325-48e3-ba17-70c375f2ca22/s1200?w'
    },
    {id: '3',
    description: 'Best description ever №3',
    createdAt: new Date('2018-06-13T21:00:00'),
    author: 'Inan Ivanov',
    hashTags:['#abc','#qwe','#uio'],
    likes:['ABC'],
    photoLink: 'http://www.setwalls.ru/download.php?file=201305/2560x1600/setwalls.ru-37717.jpg'
    }  */ 
    ];

var list = new PostList(photoPosts, '');
list.restore();


class View {
    _posts;
    _user;
    _authors;
    static idToEdit;
    static idToDelete;
    static editOrAdd;

    static setUser(name) {
        this._user = name;
        if (this._user === "Guest") {
            document.getElementById("add").textContent = "Guests cant add posts";
            document.getElementById("username").textContent = "Log In";
            document.getElementById("addButton").style.display="none";
             document.getElementById("exit").style.display="none";
             document.getElementById("reg").style.display="initial";
        }else{
        var user = document.getElementById("username");
        user.textContent = name;
        document.getElementById("add").textContent = "Add your posts";
            document.getElementById("addButton").style.display="initial";
             document.getElementById("exit").style.display="initial";
              document.getElementById("reg").style.display="none";
          }
    }

    static addPhotoPostToHtml(post) {
        let elements = document.getElementById('posts');
        let element = document.createElement("div");
        element.id = post.id;
        element.className="photo";
        element.classList.add("posts");
        let str = "";
        for (let i = 0; i < post.hashTags.length; i++) {
            str = str + post.hashTags[i] + " ";
        }

        let a = `
        <div class="photo" id=${post.id}>
                <div id='user' class="username">${post.author}</div>
                <div id='date' class="date">${post.createdAt}</div>
                <img id='photo' src="${post.photoLink}" width="70%" height="60%">
                <img src="https://pixy.org/src/477/4773926.png"; height="40"; width="40"; hspace="30%"; vspace="2px">
                <button class="delete" id='delete'><img src="https://cdn.icon-icons.com/icons2/1089/PNG/512/basket_78316.png"; height="40"; width="40";></button>
                <button class="edit" id='edit' ><img src="https://sharpsnippets.files.wordpress.com/2013/12/editblue.png"; height="40"; width="40";></button>
                <div id='hashtags' class="hashtag">${str}</div>
            <div class="desc" id="description"><b><i><face="Georgia" size="2px">${post.description}</font></i></b> </div>
        </div>`;

        element.innerHTML = a;
        if (post.author !== View._user) {
            element.querySelector('#delete').style.display = "none";
            element.querySelector('#edit').style.display = "none";
        }
        var tempUser = JSON.parse(localStorage.getItem('tempUser'));
        elements.appendChild(element);
        element.addEventListener('click', function (event) {
            var target = event.target;

            if (target.className === 'delete') {
                View.removePost(post.id);
            }

            if (target.className === 'edit') {
                View.editOrAdd="";
                document.getElementById('photoModal').src = post.photoLink;
                document.getElementById('nameModal').textContent = post.author;
                document.getElementById('dateModal').textContent = post.createdAt;
                document.getElementById('shortDescrModal').value = post.description;
                document.getElementById('hashTagsModal').value = str;
                editModal.style.display = 'block';
                View.idToEdit = post.id;
                View.editOrAdd = 'edit';
            }

        });
    }


    static compareTo(a, b) {
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        else {
            return 0;
        }
    }


    static addPost(photoPost) {
      View.addPhotoPostToHtml(photoPost);
    }

    static showPosts(posts) {
        for (var i = 0; i < posts.length; i++) {
            View.addPhotoPostToHtml(posts[i]);
        }
    }

    static removePost(id) {
        document.getElementById(id).remove();
    }

    static editPost(id, photoPost) {

        var post = document.getElementById(id);
        if (post != null) {
            if (photoPost.description !== undefined)
                post.querySelector('div[id="description"]').textContent = photoPost.description;
            if (photoPost.photoLink !== undefined)
                post.querySelector('img[id="photo"]').src = photoPost.photoLink;
       
            if (photoPost.hashTags !== undefined){
                 var str = "";
                 for (var i = 0; i < photoPost.hashTags.length; i++) {
                 str = str + photoPost.hashTags[i] + " ";
                }
                post.querySelector('div[id="hashtags"]').textContent = str;
            }
         }
    }
   static addAuthors(posts) {
        var array = [];
        for (var i = 0; i < posts.length; i++)
                array.push(posts[i].author);
                var authorsList = Array.from(new Set(array));
                this._authors=new Set(array)
        var dl = document.createElement('datalist');
        document.querySelector('p[id="list"]').replaceChild(dl, document.querySelector('datalist[id="authors"]'));
        document.querySelector('datalist').id = "authors";
        authorsList.forEach(author => {
            var elem = document.createElement('option');
            elem.value = author;
            (document.querySelector('datalist[id="authors"]')).appendChild(elem);
        })
    }

}
 modul.setUser("Guest");





