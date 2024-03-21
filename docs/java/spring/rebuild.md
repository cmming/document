1、 AI_HBZTB_BIDDING_DOCUMENT_INFO 修改FILE_ID， 重置isScan 为 false 、fjfx 重置为0、ocrStatus改成0

2、 定位结果 AI_KG_ZTB_POSITION 根据 FILE_ID 删除掉历史的定位信息

3、 ocr结果  AI_TENDER_FILE_OCR_RESULT根据文件的FILE_ID 删除掉历史的ocr结果




select  FINAL_SCORE,JS_SCORE,PRICE_SCORE,SW_SCORE,ADJUST_DIFF,ADJUST_SCORE,SCORE_CHANGED,SUGGEST_BIDDER,TOTAL_ADJUST_DIFF from ai_kg_ztb_portal 

-- is_ps_end默认0
select  is_ps_end,CPJG,ps_avg_score from ai_hbztb_bidding_document_info 

-- is_ps_end默认0
select  is_ps_end,CPJG,PS_START_TIME,PS_END_TIME,inspect_submit,pssz,TOTAL_SCORE from ai_hbztb_document_assignment 



-- 分配表的GID 
select * from AI_HBZTB_FALLBACK_RECORD where ztbxxId = '1dfe21ef1ba54935b689e3b26b070abd'

-- 分配表的GID 
select tenderinfo_id from ai_kg_ztb_ai_rule_result WHERE 

-- 分配表的GID 
select tenderinfo_id from ai_kg_ztb_rule_veto_info

