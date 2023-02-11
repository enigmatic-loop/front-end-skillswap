import { React } from "react";
import Trade from "./Trade";
import "./TradeList.css";

const TradeList = (props) => {
    const trades = props.trades
    const selectedSkill = props.selectedSkill
    const fetchOneSkillBySkillIdCallbackFunc = props.fetchOneSkillBySkillIdCallbackFunc
    const userSkills = props.userSkills
    const acceptDeclineTrade = props.acceptDeclineTradeCallbackFunc

    const pendingTrades = [];
    const completedTrades = [];

    // console.log('pendingTrades List', pendingTrades)

    if (trades) {
      for (const trade of trades) {
        if ((trade.recip_accept === false && trade.send_accept === true) || (trade.recip_accept === true && trade.send_accept === false)) {
          pendingTrades.push(
            <Trade
              key={trade.id}
              id={trade.id}
              recipAccept={trade.recip_accept}
              recipSkill={trade.recip_skill}
              recipUser={trade.recip_user}
              recipViewed={trade.recip_viewed}
              sendAccept={trade.send_accept}
              sendSkill={trade.send_skill}
              sendUser={trade.send_user}
              sendViewed={trade.send_viewed}
              timeStamp={trade.time_stamp}
              selectedSkill={selectedSkill}
              fetchOneSkillBySkillIdCallbackFunc={fetchOneSkillBySkillIdCallbackFunc}
              userSkills={userSkills}
              acceptDeclineTrade={acceptDeclineTrade}
            />
          )
        } else if (trade.recip_accept === true && trade.send_accept === true) {
          completedTrades.push(
            <Trade
              key={trade.id}
              id={trade.id}
              recipAccept={trade.recip_accept}
              recipSkill={trade.recip_skill}
              recipUser={trade.recip_user}
              recipViewed={trade.recip_viewed}
              sendAccept={trade.send_accept}
              sendSkill={trade.send_skill}
              sendUser={trade.send_user}
              sendViewed={trade.send_viewed}
              timeStamp={trade.time_stamp}
              selectedSkill={selectedSkill}
              fetchOneSkillBySkillIdCallbackFunc={fetchOneSkillBySkillIdCallbackFunc}
              userSkills={userSkills}
              acceptDeclineTrade={acceptDeclineTrade}
            />
          )
        }
      }
    }

  return (
    <div>
      <h2>Pending Trades</h2>
      <ul>{pendingTrades}</ul>
      <h2>Completed Trades</h2>
      <ul>{completedTrades}</ul>
    </div>
  )
}

export default TradeList;