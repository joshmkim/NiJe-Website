"use strict";

document.addEventListener('DOMContentLoaded', function() {
    fetchPosts(1)

    const paginationButtons = document.querySelectorAll('.p-3[data-page]');
    paginationButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.getAttribute('data-page');
        fetchPosts(page);
      });
    });
  });
  
  async function fetchPosts(pageNumber) {
    try {
        const response = await fetch('stories.json');
        const stories = (await response.json()).reverse();

        const storiesPerPage = 6;
        const startIndex = (pageNumber - 1) * storiesPerPage;
        const endIndex = startIndex + storiesPerPage;

        const storiesToDisplay = stories.slice(startIndex, endIndex);

        console.log(storiesToDisplay)
        renderPosts(storiesToDisplay);

    } catch (error) {
        console.error('Error loading stories:', error);
    }
}


  function renderPosts(posts) {
    const postsContainer = document.querySelector('#stories .container .row');
    postsContainer.innerHTML = ''; // Clear existing posts
  
    posts.forEach(post => {
        console.log(post.image)
      const postElement = document.createElement('div');
      postElement.classList.add('col-lg-4', 'col-md-6', 'mb-4');
      postElement.innerHTML = `

        <div class="news-1" style="background-image: url('images/${post.image}');">
          <div class="text">
            <h3><a href="story.html">${post.title}</a></h2>
            <span class="category d-block mb-3">${post.content[0].slice(0, 100)}...</span>
            <a href="story.html?id=${post.id}" class="d-block arrow-wrap"><span class="icon-arrow_forward"></span></a>
          </div>
        </div>
      `;
      postsContainer.appendChild(postElement);
    });


  }

 