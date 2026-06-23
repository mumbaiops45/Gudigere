import API from "./api";

// =====================
// TYPES
// =====================

export interface Review {
    _id: string;
    code: string;
    customer: {
        _id: string;
        name: string;
        email?: string;
    };
    product: {
        _id: string;
        title: string;
    };
    rating: number;
    comment: string;
    status: "Pending" | "Published" | "Rejected";
    createdAt: string;
    updatedAt: string;
}

export interface CreateReviewData {
    product: string;
    rating: number;
    comment: string;
}

// =====================
// TOKEN
// =====================

const getToken = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }

    return null;
};

// =====================
// PUBLIC
// =====================

// Get reviews of one product
export const getProductReviews = async (
    productId: string
): Promise<{ total: number; reviews: Review[] }> => {
    const res = await API.get(`/reviews/product/${productId}`);
    return res.data;
};

// Get all published reviews
export const getPublishedReviews = async (): Promise<Review[]> => {
    const res = await API.get("/reviews/published");
    return res.data;
};

// =====================
// CUSTOMER
// =====================

// Create review
export const createReview = async (
    data: CreateReviewData
): Promise<any> => {
    const token = getToken();

    const res = await API.post("/reviews", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

// Update review
export const updateReview = async (
    id: string,
    data: Partial<CreateReviewData>
): Promise<any> => {
    const token = getToken();

    const res = await API.put(`/reviews/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

// Delete review
export const deleteReview = async (
    id: string
): Promise<any> => {
    const token = getToken();

    const res = await API.delete(`/reviews/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

// =====================
// ADMIN
// =====================

// Get all reviews
export const getAllReviews = async (
    status?: string
): Promise<any> => {
    const token = getToken();

    const res = await API.get("/reviews", {
        params: status ? { status } : {},
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

// Get single review
export const getReview = async (
    id: string
): Promise<Review> => {
    const token = getToken();

    const res = await API.get(`/reviews/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

// Approve review
export const approveReview = async (
    id: string
): Promise<any> => {
    const token = getToken();

    const res = await API.patch(
        `/reviews/${id}/approve`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
};

// Reject review
export const rejectReview = async (
    id: string
): Promise<any> => {
    const token = getToken();

    const res = await API.patch(
        `/reviews/${id}/reject`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
};
