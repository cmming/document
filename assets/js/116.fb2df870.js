(window.webpackJsonp=window.webpackJsonp||[]).push([[116],{408:function(_,e,t){"use strict";t.r(e);var s=t(10),n=Object(s.a)({},(function(){var _=this,e=_._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[e("p",[_._v("1、 AI_HBZTB_BIDDING_DOCUMENT_INFO 修改FILE_ID， 重置isScan 为 false 、fjfx 重置为0、ocrStatus改成0")]),_._v(" "),e("p",[_._v("2、 定位结果 AI_KG_ZTB_POSITION 根据 FILE_ID 删除掉历史的定位信息")]),_._v(" "),e("p",[_._v("3、 ocr结果  AI_TENDER_FILE_OCR_RESULT根据文件的FILE_ID 删除掉历史的ocr结果")]),_._v(" "),e("p",[_._v("select  FINAL_SCORE,JS_SCORE,PRICE_SCORE,SW_SCORE,ADJUST_DIFF,ADJUST_SCORE,SCORE_CHANGED,SUGGEST_BIDDER,TOTAL_ADJUST_DIFF from ai_kg_ztb_portal")]),_._v(" "),e("p",[_._v("-- is_ps_end默认0\nselect  is_ps_end,CPJG,ps_avg_score from ai_hbztb_bidding_document_info")]),_._v(" "),e("p",[_._v("-- is_ps_end默认0\nselect  is_ps_end,CPJG,PS_START_TIME,PS_END_TIME,inspect_submit,pssz,TOTAL_SCORE from ai_hbztb_document_assignment")]),_._v(" "),e("p",[_._v("-- 分配表的GID\nselect * from AI_HBZTB_FALLBACK_RECORD where ztbxxId = '1dfe21ef1ba54935b689e3b26b070abd'")]),_._v(" "),e("p",[_._v("-- 分配表的GID\nselect tenderinfo_id from ai_kg_ztb_ai_rule_result WHERE")]),_._v(" "),e("p",[_._v("-- 分配表的GID\nselect tenderinfo_id from ai_kg_ztb_rule_veto_info")])])}),[],!1,null,null,null);e.default=n.exports}}]);