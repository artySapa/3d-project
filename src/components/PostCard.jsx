import React from "react";

const PostCard = ({title, content, user, time, rank}) => {
    return (
        
        <div class="flex bg-white shadow-lg rounded-lg md:mx-auto my-12 max-w-md md:max-w-2xl ">
   <div class="flex items-center px-4 py-6">
      <img class="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
      <div class="">
         <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 -mt-1">{title}</h2>
         </div>
         <p class="text-gray-700">{time} </p>
         <p class="mt-3 text-gray-700 text-sm">
            {content}
         </p>
         <div class="mt-4 flex items-center">
            <div class="flex mr-2 text-gray-700 text-sm mr-3">
               <svg fill="none" viewBox="0 0 24 24"  class="w-4 h-4 mr-1" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
               <span>{rank}</span>
            </div>
            <div class="flex mr-2 text-gray-700 text-sm mr-4">
               <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
               <span>Respond</span>
            </div>
         </div>
      </div>
   </div>
</div>
    );
}

export default PostCard;