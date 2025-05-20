document.addEventListener('DOMContentLoaded', function() {
    function loadJSON() {
        fetch('../html/reviews.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                displayContent(data);
            })
            .catch(error => {
                console.error('Ошибка загрузки JSON:', error);
                const main = document.querySelector('main');
                main.innerHTML = '<div class="error-message">Не удалось загрузить отзывы. Пожалуйста, попробуйте позже.</div>';
            });
    }

    function displayContent(data) {
        displayHead(data.head);
        const reviewsContainer = document.createElement('div');
        reviewsContainer.className = 'reviews-container';
        document.querySelector('main').appendChild(reviewsContainer);
        displayReviews(data.reviews);
        addNewReview(data.new_review_form);
    }

    function displayHead(head) {
        document.title = head.title;
        const style = document.createElement('style');
        style.textContent = `
            .reviews-container {
                width: 62%;
                margin: 0 auto;
                padding: 20px 0;
            }
            .review {
                background-color: rgba(255, 255, 255, 0.705);
                border: 3px solid rgba(41, 37, 126, 1);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 20px;
                font-family: Arial, Helvetica, sans-serif;
            }

            .review h3 {
                color: rgba(41, 37, 126, 1);
                margin: 0 0 10px 0;
                font-size: 1.2em;
            }

            .review-rating {
                color: rgba(41, 37, 126, 1);
                font-weight: bold;
                margin: 5px 0;
            }

            .review-comment {
                color: #333;
                line-height: 1.5;
            }

            .new-review-form {
                background-color: rgba(255, 255, 255, 0.705);
                border: 3px solid rgba(41, 37, 126, 1);
                border-radius: 15px;
                padding: 20px;
                margin-top: 30px;
            }

            .new-review-form label {
                display: block;
                margin-bottom: 8px;
                color: rgba(41, 37, 126, 1);
                font-weight: bold;
            }

            .new-review-form input,
            .new-review-form textarea,
            .new-review-form select {
                width: 80%;
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid rgba(41, 37, 126, 0.5);
                border-radius: 5px;
                background-color: rgba(255, 255, 255, 0.8);
            }

            .new-review-form button {
                background-color: rgba(41, 37, 126, 1);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1em;
                transition: background-color 0.3s;
            }

            .new-review-form button:hover {
                background-color: rgba(41, 37, 126, 0.8);
            }

          
        `;
        document.head.appendChild(style);
    }

    function displayReviews(reviews) {
        const container = document.querySelector('.reviews-container');
        
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <h3>${review.name}</h3>
                <div class="review-rating">Оценка: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <div class="review-comment">${review.comment}</div>
            `;
            container.appendChild(reviewElement);
        });
    }

    function addNewReview(new_review_form) {
        const container = document.querySelector('.reviews-container');
        const formContainer = document.createElement('div');
        formContainer.className = 'new-review-form';
        formContainer.innerHTML = `
            <h3>Оставить отзыв</h3>
            <form id="newReviewForm">
                <label for="name">Ваше имя:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="rating">Ваша оценка:</label>
                <select id="rating" name="rating" required>
                    <option value="5">5 ★★★★★</option>
                    <option value="4">4 ★★★★☆</option>
                    <option value="3">3 ★★★☆☆</option>
                    <option value="2">2 ★★☆☆☆</option>
                    <option value="1">1 ★☆☆☆☆</option>
                </select>
                
                <label for="comment">Ваш отзыв:</label>
                <textarea id="comment" name="comment" rows="4" required></textarea>
                
                <button type="submit">Отправить отзыв</button>
            </form>
        `;
        container.appendChild(formContainer);

        const form = document.getElementById('newReviewForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const rating = parseInt(document.getElementById('rating').value);
            const comment = document.getElementById('comment').value;
            const newReview = document.createElement('div');
            newReview.className = 'review';
            newReview.innerHTML = `
                <h3>${name}</h3>
                <div class="review-rating">Оценка: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
                <div class="review-comment">${comment}</div>
            `;
            const firstReview = document.querySelector('.review');
            if (firstReview) {
                firstReview.parentNode.insertBefore(newReview, firstReview);
            } else {
                document.querySelector('.reviews-container').appendChild(newReview);
            }
            form.reset();
        });
    }

    loadJSON();
});