const CarbonRecord = require('../../models/CarbonRecord');
const User = require('../../models/User');

/**
 * POST /api/carbon
 * body: { date, amount, desc, category }
 */
const createRecord = async (req, res) => {
  try {
    const { date, amount, desc, category } = req.body;
    const userId = req.user.userId; // JWT 미들웨어에서 주입
    const record = await CarbonRecord.create({
      user: userId,
      date: new Date(date),
      amount,
      desc,
      category,
    });

    // (선택) 월 누적 캐싱 업데이트
    const monthKey = record.date.toISOString().slice(0, 7); // 'YYYY-MM'
    const incKey = amount > 0 ? 'monthlyCarbonStat.totalPlus' : 'monthlyCarbonStat.totalMinus';
    await User.updateOne(
      { _id: userId, 'monthlyCarbonStat.month': monthKey },
      {
        $inc: { [incKey]: amount },
        $setOnInsert: { 'monthlyCarbonStat.month': monthKey },
      },
      { upsert: true }
    );

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/carbon/:year/:month   (예: /api/carbon/2024/03)
 * -> 해당 월의 전체 레코드 반환
 */
const getMonthlyRecords = async (req, res) => {
  const { year, month } = req.params; // month: 1~12
  const userId = req.user.userId;

  const from = new Date(`${year}-${month.padStart(2, '0')}-01T00:00:00Z`);
  const to = new Date(from);
  to.setMonth(to.getMonth() + 1);

  try {
    const records = await CarbonRecord.find({
      user: userId,
      date: { $gte: from, $lt: to },
    }).sort({ date: 1 });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
    createRecord,
    getMonthlyRecords,
  };