
const records =[
]

export class RecordService {
    
    // 기록 조회
    async getRecord() {
        console.log("record info is",records)
        return records
    }

    //기록 추가
    async postRecord(record) {
        console.log("record. service", record)
        records.push(record)

        return records
    }

    //기록 삭제
    async deleteRecord(id) {
        const recordId = parseInt(id, 10);
        if (isNaN(recordId)) {
            throw new Error("유효하지 않은 ID입니다.");
        }

        records.splice(recordId, 1);
        return records;
    }
}
