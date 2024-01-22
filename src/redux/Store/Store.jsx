import { configureStore } from "@reduxjs/toolkit";
import {AuthSlice} from "../AuthSlice"
import { blogSlice } from "../BlogSlice";
import { BlogDeatilsSlice } from "../BlogDetailsSlice";
import { StudentSlice } from "../StudentSlice";
import { CategorySlice } from "../CategorySlice";
import { HomeSlice } from "../HomeSlice";
import { CourseSlice } from "../CourseSlice";
import { TeamSlice } from "../TeamSlice";
import { TestimonialSlice } from "../TestimonialSlice";
import { ServiceSlice } from "../ServicesSlice";
import { CommentSlice } from "../CommentSlice";
import { CategortWithBlog } from "../CategoryWithBlogSlice";
//import { CategortWithBlog} from "../CategoryWithBlogSlice";

const Store=configureStore({
    reducer:{
        Auth:AuthSlice.reducer,
        blog:blogSlice.reducer,
        detailBlog:BlogDeatilsSlice.reducer,
        Student:StudentSlice.reducer,
        categorySlice:CategorySlice.reducer,
        banner:HomeSlice.reducer,
        course:CourseSlice.reducer,
        team:TeamSlice.reducer,
        testimonial:TestimonialSlice.reducer,
        service:ServiceSlice.reducer,
        Comment:CommentSlice.reducer,
        Catwiseblog:CategortWithBlog.reducer,
        
       // catWithBlog:CategortWithBlog.reducer,
    }
});

export default Store;