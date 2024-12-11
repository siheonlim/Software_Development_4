import express from 'express';
import { UserService } from '../service/user';
const router = express.Router();


// 회원가입 라우터
router.post('/signup', async (req, res) => {
    try {
        // console.log(req.body)
        const { useId, usePw, name } = req.body;
        // console.log(useId,"--",usePw,"--",name)
        const userService = new UserService();
        const result = await userService.signUp({
            id: useId, 
            pw: usePw, 
            name });
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
});

// 로그인 라우터
router.post('/signin', async (req, res) => {
    try {
        console.log(req.body)
        const { id, pw } = req.body;
        const userService = new UserService();
        const result = await userService.signIn(id, pw);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
});

export default router;
