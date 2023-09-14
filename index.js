const postIdInput = document.getElementById('postIdInput');
const searchButton = document.getElementById('searchButton');
const postContainer = document.getElementById('postContainer');
const postContent = document.getElementById('postContent');
const commentsButton = document.getElementById('commentsButton');
const commentsContainer = document.getElementById('commentsContainer');
const commentsList = document.getElementById('commentsList');
const errorContainer = document.getElementById('errorContainer');

searchButton.addEventListener('click', () => {
    const postId = postIdInput.value;

    if (!postId || postId < 1 || postId > 100) {
        errorContainer.textContent = 'Enter a valid post ID (1-100)';
        return;
    }    

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data from the server');
            }
            return response.json();
        })
        .then(post => {
            postContent.innerHTML = `
                <p><strong>ID:</strong> ${post.id}</p>
                <p><strong>Title:</strong> ${post.title}</p>
                <p><strong>Body:</strong> ${post.body}</p>
            `;
            postContainer.style.display = 'block';
            errorContainer.textContent = '';
        })
        .catch(error => {
            errorContainer.textContent = `Error: Failed to fetch data from the server`;
        });
});

commentsButton.addEventListener('click', () => {
    const postId = postIdInput.value;

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data from the server');
            }
            return response.json();
        })
        .then(comments => {
            const commentsHTML = comments.map(comment => `
                <li>
                    <strong>${comment.name}</strong> (${comment.email}):<br>
                    ${comment.body}
                </li>
            `).join('');
            commentsList.innerHTML = commentsHTML;
            commentsContainer.style.display = 'block';
            errorContainer.textContent = '';
        })
        .catch(error => {
            errorContainer.textContent = `Error: Failed to fetch data from the server`;
        });
});