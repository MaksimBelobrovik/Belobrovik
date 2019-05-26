select user.NAME as name from mydb.photo_post left join mydb.user on photo_post.USER_ID = user.USER_ID
group by user.USER_ID
having count(photo_post.USER_ID) >= 3;