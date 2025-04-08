/**
 * Mock API utility for handling form submissions
 */
const MOCK_API_DELAY = 1000; // 1 second delay to simulate API call

export const submitContactForm = async (formData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
        throw new Error('All fields are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        throw new Error('Invalid email format');
    }

    // Simulate successful submission
    return {
        success: true,
        message: 'Message sent successfully!',
        data: formData,
    };
};
