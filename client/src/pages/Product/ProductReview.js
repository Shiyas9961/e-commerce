import React from 'react'

const ProductReview = ({ reviews }) => {
  return (
        <div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {
                reviews.map(review => (
                    <div className="review-card my-3" key={review._id}>
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                        </div>
                        <p className="review_user"> By {review.user.username}</p>
                        <p className="review_comment">{review.comments}</p>
                        <hr />
                    </div>
                ))
            }
        </div>
  )
}

export default ProductReview