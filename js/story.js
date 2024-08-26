document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('id');

    if (storyId) {
      try {
        console.log("Fetching", storyId)
        const response = await fetch('stories.json');
        const stories = await response.json();
        const story = stories.find((story) => story.id == storyId)
        
        document.getElementById('story-title').innerText = story.title;
        document.getElementById('story-image').src = `images/${story.image}`;
        document.getElementById('story-caption').innerText = story.credit;
        document.getElementById('image-caption').innerText = story.photo_credit;

        story.content.forEach(line => {
          document.getElementById('story-content').innerHTML += `<p>${line}</p>`;
          document.getElementById('story-content').innerHTML += "<br>";
        });
      } catch (error) {
        console.error('Error fetching story data:', error);
      }
    } else {
      console.error('No story ID found in URL');
    }
  });