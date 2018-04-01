package com.peppermintchain.samples.irs.db;

import java.math.BigDecimal;
import java.util.Date;

import com.peppermintchain.core.annotations.PMCName;
import com.peppermintchain.core.annotations.PMCPrimaryKey;

@PMCName("IRS_INTEREST_RATE")
@PMCPrimaryKey({ "INDEX_NAME", "PERIOD", "VALID_FOR_DATE" })
public class IRSInterestRate {

    @PMCName("SOURCE")
    private String source;

    @PMCName("INDEX_NAME")
    private String indexName;

    @PMCName("PERIOD")
    private String period;

    @PMCName("VALID_FOR_DATE")
    private Date validForDate;

    @PMCName("INTEREST_RATE")
    private BigDecimal interestRate;

    public String getIndexName() {
	return indexName;
    }

    public void setIndexName(String indexName) {
	this.indexName = indexName;
    }

    public String getPeriod() {
	return period;
    }

    public void setPeriod(String period) {
	this.period = period;
    }

    public Date getValidForDate() {
	return validForDate;
    }

    public void setValidForDate(Date validForDate) {
	this.validForDate = validForDate;
    }

    public BigDecimal getInterestRate() {
	return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
	this.interestRate = interestRate;
    }

    public String getSource() {
	return source;
    }

    public void setSource(String source) {
	this.source = source;
    }

}
