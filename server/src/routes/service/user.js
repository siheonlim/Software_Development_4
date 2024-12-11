
import fs from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';

const USERS_FILE = path.resolve(__dirname, 'users.csv'); // CSV 파일 경로

export class UserService {
    // 파일 읽기
    async readUsers() {
        try {
            const fileContent = await fs.readFile(USERS_FILE, 'utf-8');
            return Papa.parse(fileContent, { header: true }).data;
        } catch (error) {
            return []; // 파일이 없으면 빈 배열 반환
        }
    }

    // 파일 쓰기
    async writeUsers(users) {
        const csv = Papa.unparse(users);
        await fs.writeFile(USERS_FILE, csv, 'utf-8');
    }

    // 회원가입
    async signUp(user) {
        if (!user.id || !user.pw || !user.name) {
            throw new Error('모든 필드를 입력해야 합니다.');
        }

        const users = await this.readUsers();
        const existingUser = users.find(u => u.id === user.id);
        if (existingUser) {
            throw new Error('이미 존재하는 ID입니다.');
        }

        users.push(user);
        await this.writeUsers(users);
        return { message: '회원가입 성공', user };
    }

    // 로그인
    async signIn(id, pw) {
        const users = await this.readUsers();
        const user = users.find(u => u.id === id);
        if (!user) {
            throw new Error('존재하지 않는 아이디입니다.');
        }

        if (user.pw !== pw) {
            throw new Error('비밀번호가 틀렸습니다.');
        }

        return { message: '로그인 성공', user };
    }
}
