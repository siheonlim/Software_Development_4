import express from 'express';
import { RecordService } from '../service/record';
const router = express.Router();


// 조회 라우터 (목록 갱신)
router.get('/', async (req, res) => {
    try{
        const recordService = new RecordService();
        const data = await recordService.getRecord();

        return res.status(200).json(data)
    }
    catch(e){
        return res.status(400).json({ message: e.message })
    }
})

//기록 등록 라우터
router.post('/postrecord', async(req, res) => {
    try{
        // console.log(req.body)

        const { date, distance, weather, pace} = req.body;
        // console.log("date",date,"req.body",req.body)
        const recordService = new RecordService();
        const result = await recordService.postRecord({
            date,
            distance,
            weather,
            pace
        })
        console.log("result is ", result)
        return res.status(200).json(result);
    }catch(e){
        return res.status(400).json({ message: e.message });
    }
})

//기록 삭제 라우터
router.delete('/:id', async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        const recordService = new RecordService();

        const result = await recordService.deleteRecord(id);
        return res.status(200).json({ message: "기록 삭제 성공", records: result });
    } catch (e) {
        console.error("Error in DELETE /record/:id", e.message);
        return res.status(400).json({ message: e.message });
    }
});



export default router;
