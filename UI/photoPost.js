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
       if(PostList.validate(photoPost)){
           photoPost.likes=[];
           photoPosts.push(photoPost);
           return true;
       } else {
           return false;
       }
    }

    get(id){
        return photoPosts.find(function(item){
            return item.id==id;
        });
    }

   static _filter={
        author: function(list,author){
           return list.filter(function(item){
                return item.author.includes(author);
            });
        },
        firstDate: function(list,firstDate){
            return list.filter(function(item){
                return item.createdAt>=firstDate;
            });
        },
        secondDate: function(list,secondDate){
            return list.filter(function(item){
                return item.createdAt<=secondDate;
            });
        },
        hashTags: function(list,hashTags){
            return list.filter(function(item){
             return item.hashTags.some(tag => hashTags.indexOf(tag)>=0);
            });
        }
    } 

    getPage(skip=0,top=10,filterConfig={}){
    
      var sortedPosts=this._posts;
        Object.keys(filterConfig).forEach(function(field){
          return sortedPosts=this._filter[field](sortedPosts,filterConfig[field]);
        });
        sortedPosts.sort(function(a,b){
            return a.createdAt-b.createdAt;
        });
        sortedPosts = sortedPosts.slice(skip, skip + top);
      
        return sortedPosts;
    } 

    remove(id){
       for(var i=0;i<photoPosts.length;i++){
            if(photoPosts[i].id===id){
                      photoPosts.splice(i,1);
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
    {
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
    }   
    ];

var list = new PostList(photoPosts, '');


class View {
    _posts;
    _user;
    _authors;

    static setUser(name) {
        this._user = name;
        if (this._user === "Guest") {
            document.getElementById("add").textContent = "Guests cant add posts";
            document.getElementById("username").textContent = "Log In";
            document.getElementById("addButton").style.display="none";
            return undefined;
        }
        var user = document.getElementById("username");
        user.textContent = name;
        return user;
    }

    static addPhotoPostToHtml(photoPost) {
        const posts = document.getElementById("posts");
        const temp = document.getElementById("temp");
         if (document.getElementById(photoPost.id) != null)
             return;

        var post = document.importNode(temp.content, true);

        post.querySelector('div[class="photo"]').id = photoPost.id;
        post.getElementById('user').textContent = this._user;
        var str = "";
        for (var i = 0; i < photoPost.hashTags.length; i++) {
            str = str + photoPost.hashTags[i] + " ";
        }
        post.getElementById('hashtags').textContent = str;
        post.getElementById('description').textContent = photoPost.description+"  id:"+photoPost.id;
        post.getElementById('photo').src = photoPost.photoLink;
        var dd = photoPost.createdAt.getDate();
        var mm = photoPost.createdAt.getMonth();     
        var yy = photoPost.createdAt.getFullYear();
        var hh = photoPost.createdAt.getHours();
        var min = photoPost.createdAt.getMinutes();
        if (min < 10) min = '0' + min;
        var date = dd + "." + mm + "." + yy +" "+ hh + ":" + min;
        post.getElementById('date').textContent = date;
        if (photoPost.author !== this._user) {
            post.getElementById('edit').style.display = "none";
            post.getElementById('delete').style.display = "none";
        }
        posts.append(post);
    }

    static addPost(photoPost)  {
        const posts = document.getElementById("posts");
        const temp = document.getElementById("temp");
         if (document.getElementById(photoPost.id) != null)
             return;

        var post = document.importNode(temp.content, true);

        post.querySelector('div[class="photo"]').id = photoPost.id;
        post.getElementById('user').textContent = this._user;
        var str = "";
        for (var i = 0; i < photoPost.hashTags.length; i++) {
            str = str + photoPost.hashTags[i] + " ";
        }
        post.getElementById('hashtags').textContent = str;
        post.getElementById('description').textContent = photoPost.description+"  id:"+photoPost.id;
        post.getElementById('photo').src = photoPost.photoLink;
        var dd = photoPost.createdAt.getDate();
        var mm = photoPost.createdAt.getMonth();     
        var yy = photoPost.createdAt.getFullYear();
        var hh = photoPost.createdAt.getHours();
        var min = photoPost.createdAt.getMinutes();
        if (min < 10) min = '0' + min;
        var date = dd + "." + mm + "." + yy +" "+ hh + ":" + min;
        post.getElementById('date').textContent = date;
        posts.append(post);
        if(!this._authors.has(this._user)){
             var elem = document.createElement('option');
            elem.value = this._user;
            (document.querySelector('datalist[id="authors"]')).appendChild(elem);
        }
        
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





