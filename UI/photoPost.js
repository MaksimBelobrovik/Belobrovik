class PostList {
    _posts;

    

    constructor(postsList = []) {
        this._posts = postsList.slice();
    }

    clear() {
        this._posts = [];
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

    

    static validate(photoPost){
        var _validator={
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
       if(_validator.description(photoPost.description) && _validator.photoLink(photoPost.photoLink)){
       	return true;
      } else { 
          return false;
      }
    }  
    add(photoPost){
    	photoPost.id=new Date().getMilliseconds();
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

   

    getPage(skip=0,top=10,filterConfig={}){
    var _filter={
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
      var sortedPosts=this._posts;
        Object.keys(filterConfig).forEach(function(field){
          return sortedPosts=_filter[field](sortedPosts,filterConfig[field]);
        });
        sortedPosts.sort(function(a,b){
            return a.createdAt-b.createdAt;
        });
        sortedPosts = sortedPosts.slice(skip, skip + top);
      
        return sortedPosts;
    } 

    remove(id){
       for( i=0;i<photoPosts.length;i++){
            if(photoPosts[i].id===id){
                      photoPosts.splice(index,1);
                      return true;
                      }
        }
       return false;
    }

    edit(id,photoPost){
       var postToEdit=this.get(id);
    	if(PostList.validate(postToEdit)){
            if(photoPost.description!==null && typeof photoPost.description!= "undefined" ){
                postToEdit.description=photoPost.description;
            }
            if(photoPost.photoLink!==null && typeof photoPost.photoLink!= "undefined"){
                postToEdit.photoLink=photoPost.photoLink;
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

const photoPosts = [
    {
    id: '1',
    description: 'Best description ever №1',
    createdAt: new Date('2018-02-23T22:00:00'),
    author: 'Inan Ivanov',
    hashTags:['#abc','#rty','#uio'],
    likes:['Inan Ivanov','QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture1.jpg'
    },
    {
    id: '2',
    description: 'Best description ever №2',
    createdAt: new Date('2017-02-23T23:00:00'),
    author: 'Inan Ivanov',
    hashTags:['#qwe','#rty','#uio'],
    likes:[],
    photoLink: 'https://randomsite.ru/randompicture2.jpg'
    },
    {id: '3',
    description: 'Best description ever №3',
    createdAt: new Date('2018-06-13T21:00:00'),
    author: 'Inan Ivanov',
    hashTags:['#abc','#qwe','#uio'],
    likes:['ABC'],
    photoLink: 'https://randomsite.ru/randompicture3.jpg'
    },
    {id: '4',
    description: 'Best description ever №4',
    createdAt: new Date('2018-01-26T20:00:00'),
    author: 'Inan Ivanov',
    hashTags:['#abc','#qwe','#rty','#uio'],
    likes:['Joe Black','QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture4.jpg'
    },
    {id: '5',
    description: 'Best description ever №5',
    createdAt: new Date('2017-12-12T19:00:00'),
    author: 'Inan Ivanov',
    hashTags:['#abc','#uio'],
    likes:['Inan Ivanov','Joe Black','QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture5.jpg'
    },
    {id: '6',
    description: 'Best description ever №6',
    createdAt: new Date('2018-10-11T18:00:00'),
    author: 'QWERTY',
    hashTags:['#uio'],
    likes:['Inan Ivanov','Joe Black','QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture6.jpg'
    },
    {id: '7',
    description: 'Best description ever №7',
    createdAt: new Date('2018-10-10T17:00:00'),
    author: 'QWERTY',
    hashTags:['#qwe','#rty','#uio'],
    likes:['QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture7.jpg'
    },
    {id: '8',
    description: 'Best description ever №8',
    createdAt: new Date('2018-09-09T18:00:00'),
    author: 'QWERTY',
    hashTags:['#abc','#qwe','#rty','#uio'],
    likes:['Inan Ivanov','ABC'],
    photoLink: 'https://randomsite.ru/randompicture8.jpg'
     },
     {id: '9',
    description: 'Best description ever №9',
    createdAt: new Date('2017-03-08T15:00:00'),
    author: 'QWERTY',
    hashTags:['#abc','#qwe','#rty','#uio'],
    likes:['Inan Ivanov','Joe Black','QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture9.jpg'
    },
    {id: '10',
    description: 'Best description ever №10',
    createdAt: new Date('2018-01-22T14:00:00'),
    author: 'QWERTY',
    hashTags:['#abc'],
    likes:['QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture10.jpg'
    },
    {id: '11',
    description: 'Best description ever №11',
    createdAt: new Date('2018-02-10T05:00:00'),
    author: 'Joe Black',
    hashTags:['#rty'],
    likes:['Inan Ivanov','Joe Black','QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture11.jpg'
    },
    {id: '12',
    description: 'Best description ever №12',
    createdAt: new Date('2017-10-30T12:00:00'),
    author: 'Joe Black',
    hashTags:['#abc','#qwe','#rty','#uio'],
    likes:['Inan Ivanov'],
    photoLink: 'https://randomsite.ru/randompicture12.jpg'
    },
    {id: '13',
    description: 'Best description ever №13',
    createdAt: new Date('2018-04-27T20:56:00'),
    author: 'Joe Black',
    hashTags:[],
    likes:['Inan Ivanov','Joe Black','QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture13.jpg'
    },
    {id: '14',
     description: 'Best description ever №14',
     createdAt: new Date('2018-08-13T21:00:43'),
     author: 'Joe Black',
     hashTags:['#qwe','#rty','#uio'],
     likes:['QWERTY'],
     photoLink: 'https://randomsite.ru/randompicture14.jpg'
    },
    {id: '15',
    description: 'Best description ever №15',
    createdAt: new Date('2017-02-21T15:22:00'),
    author: 'Joe Black',
    hashTags:['#abc','#qwe','#rty','#uio'],
    likes:['Inan Ivanov','Joe Black','QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture15.jpg'
    },
    {id: '16',
    description: 'Best description ever №16',
    createdAt: new Date('2018-06-20T16:01:00'),
    author: 'ABC',
    hashTags:['#abc','#qwe','#rty','#uio'],
    likes:[],
    photoLink: 'https://randomsite.ru/randompicture16.jpg'
    },
    {id: '17',
    description: 'Best description ever №17',
    createdAt: new Date('2018-10-20T14:03:25'),
    author: 'ABC',
    hashTags:['#rty','#uio'],
    likes:[],
    photoLink: 'https://randomsite.ru/randompicture17.jpg'
    },
    {id: '18',
    description: 'Best description ever №18',
    createdAt: new Date('2017-02-17T12:54:44'),
    author: 'ABC',
    hashTags:['#abc','#qwe','#rty','#uio'],
    likes:['Inan Ivanov','Joe Black','ABC'],
    photoLink: 'https://randomsite.ru/randompicture18.jpg'
     },
    {id: '19',
    description: 'Best description ever №19',
    createdAt: new Date('2017-03-13T23:00:00'),
    author: 'ABC',
    hashTags:['#abc','#qwe','#uio'],
    likes:['Inan Ivanov','Joe Black','QWERTY','ABC'],
    photoLink: 'https://randomsite.ru/randompicture19.jpg'
    },
    {id: '20',
    description: 'Best description ever №20',
    createdAt: new Date('2018-07-21T10:00:00'),
    author: 'ABC',
    hashTags:['#abc','#qwe','#rty','#uio'],
    likes:['ABC'],
    photoLink: 'https://randomsite.ru/randompicture20.jpg'
    },];



let test = new PostList(photoPosts);
console.log("let test = new PostList(photoPosts);");
console.log("");
console.log("");
console.log("test._posts");
console.log(test._posts);
console.log("");
console.log("");
console.log("test.getPage(0, 10)");
console.log(test.getPage(0, 10));
console.log("test.getPage(10, 10)");
console.log(test.getPage(10, 10));
console.log("test.getPage(0, 10, {author: 'AB'})");
console.log(test.getPage(0, 10, {author: 'AB'}));
console.log("");
console.log("");
console.log("test.get('10')");
console.log(test.get("10"));
console.log('test.get(10)');
console.log(test.get(10));
console.log("");
console.log("");
console.log("PostList.validate({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] })");
console.log(PostList.validate({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));
console.log("PostList.validate({ id: '', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] })");
console.log(PostList.validate({ id: '', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));
console.log("");
console.log("");
console.log("test.add({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-03-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] })");
console.log(test.add({ id: '23', description: 'Nexus 10', createdAt: new Date('2019-08-08T21:57:49'), author: 'KillerMask', photoLink: 'http://photoportal.by/photos/18', hashTags: [], likes: [] }));
console.log("");
console.log("");
console.log("test.get('1')");
console.log(test.get("1"));
console.log("test.edit('1', { photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg,description:'Поменяли!'' })");
console.log(test.edit('1', { photoLink: 'http://haradok.info/static/news/5/4565/preview.jpg', description: "zxcvbnm" }));
console.log("test.get('1')");
console.log(test.get("1"));
console.log("");
console.log("");
console.log("test.clear();");
test.clear();
console.log("test._posts");
console.log(test._posts);
