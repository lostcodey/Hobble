export const logout = (req, res) => {
    res.status(200).clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }).json({
        message: "Logout successful"
    });
}