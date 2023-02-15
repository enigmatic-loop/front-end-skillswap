import { React } from "react";
import Trade from "./Trade";
import PropTypes from "prop-types";

const TradeList = (props) => {
    const loggedUserTrades = props.loggedUserTrades
    const allSkills = props.allSkills
    const acceptDeclineTrade = props.acceptDeclineTradeCallbackFunc

    const pendingTrades = [];
    const completedTrades = [];
    const allSkillsMap = Object.fromEntries(allSkills.map((skill) => [skill.id, skill]));

    const buildTradeComponent = (trade, recipSkill, sendSkill) => {
      return (<Trade
        key={trade.id}
        id={trade.id}
        recipAccept={trade.recip_accept}
        recipSkill={recipSkill}
        recipUser={trade.recip_user}
        recipViewed={trade.recip_viewed}
        sendAccept={trade.send_accept}
        sendSkill={sendSkill}
        sendUser={trade.send_user}
        sendViewed={trade.send_viewed}
        timeStamp={trade.time_stamp}
        acceptDeclineTrade={acceptDeclineTrade}
      />)
    }

    console.log(loggedUserTrades);
    if (loggedUserTrades) {
      for (const trade of loggedUserTrades) {
        const recipSkill = allSkillsMap[trade.recip_skill];
        const sendSkill = allSkillsMap[trade.send_skill];
        if ((trade.recip_accept === false && trade.send_accept === true) || (trade.recip_accept === true && trade.send_accept === false)) {
          pendingTrades.push(buildTradeComponent(trade, recipSkill, sendSkill))
        } else if (trade.recip_accept === true && trade.send_accept === true) {
          completedTrades.push(buildTradeComponent(trade, recipSkill, sendSkill))
        }
      }
    }

  return (
    <div className="row">
      <div className="col s6 push-s6">
        <h5 className="med-text">Pending Swaps</h5>
        <ul className="collection">{pendingTrades}</ul>
      </div>
      <div className="col s6 pull-s6">
        <h5 className="med-text">Completed Swaps</h5>
        <ul className="collection">{completedTrades}</ul>
      </div>
    </div>
  )
}


TradeList.propTypes = {
  loggedUserTrades: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      send_user: PropTypes.number.isRequired,
      recip_user: PropTypes.number.isRequired,
      send_skill: PropTypes.object.isRequired,
      recip_skill: PropTypes.object.isRequired,
      send_accept: PropTypes.bool.isRequired,
      recip_accept: PropTypes.bool.isRequired,
      time_stamp: PropTypes.string.isRequired,
      send_viewed: PropTypes.bool.isRequired,
      recip_viewed: PropTypes.bool.isRequired,
    })
  ),
  selectedSkill: PropTypes.object.isRequired,
  fetchOneSkillBySkillIdCallbackFunc: PropTypes.func.isRequired,
  userSkills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      tags: PropTypes.array,
      user_name: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
    })
  ),
  acceptDeclineTrade: PropTypes.func.isRequired,
};

export default TradeList;