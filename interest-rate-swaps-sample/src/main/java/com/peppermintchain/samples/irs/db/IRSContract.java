package com.peppermintchain.samples.irs.db;


import java.math.BigDecimal;
import java.util.Date;

import com.peppermintchain.core.annotations.PMCName;
import com.peppermintchain.core.annotations.PMCPrimaryKey;

@PMCName("IRS_CONTRACT")
@PMCPrimaryKey({ "CONTRACT_ID", "SELLER_ID", "BUYER_ID" })
public class IRSContract {

    @PMCName("CONTRACT_ID")
    private String contractId;

    @PMCName("BUYER_ID")
    private String buyerId;

    @PMCName("SELLER_ID")
    private String sellerId;

    @PMCName("FIXED_LEG_RATE")
    private BigDecimal fixedLegRate;

    @PMCName("FLOATING_RATE_INDEX")
    private String floatingRateIndex;

    @PMCName("FLOATING_RATE_SPREAD")
    private BigDecimal floatingRateSpread;

    @PMCName("NOTIONAL_AMOUNT")
    private BigDecimal notionalAmount;

    @PMCName("START_DATE")
    private Date startDate;

    @PMCName("COUPON_FREQUENCY")
    private String couponFrequency;

    @PMCName("MATURITY_DATE")
    private Date maturityDate;

    @PMCName("PREV_PAYMENT_DATE")
    private Date prevPaymentDate;

    @PMCName("NEXT_PAYMENT_DATE")
    private Date nextPaymentDate;

    public String getContractId() {
	return contractId;
    }

    public void setContractId(String contractId) {
	this.contractId = contractId;
    }

    public String getBuyerId() {
	return buyerId;
    }

    public void setBuyerId(String buyerId) {
	this.buyerId = buyerId;
    }

    public String getSellerId() {
	return sellerId;
    }

    public void setSellerId(String sellerId) {
	this.sellerId = sellerId;
    }

    public BigDecimal getFixedLegRate() {
	return fixedLegRate;
    }

    public void setFixedLegRate(BigDecimal fixedLegRate) {
	this.fixedLegRate = fixedLegRate;
    }

    public String getFloatingRateIndex() {
	return floatingRateIndex;
    }

    public void setFloatingRateIndex(String floatingRateIndex) {
	this.floatingRateIndex = floatingRateIndex;
    }

    public BigDecimal getFloatingRateSpread() {
	return floatingRateSpread;
    }

    public void setFloatingRateSpread(BigDecimal floatingRateSpread) {
	this.floatingRateSpread = floatingRateSpread;
    }

    public BigDecimal getNotionalAmount() {
	return notionalAmount;
    }

    public void setNotionalAmount(BigDecimal notionalAmount) {
	this.notionalAmount = notionalAmount;
    }

    public Date getStartDate() {
	return startDate;
    }

    public void setStartDate(Date startDate) {
	this.startDate = startDate;
    }

    public String getCouponFrequency() {
	return couponFrequency;
    }

    public void setCouponFrequency(String couponFrequency) {
	this.couponFrequency = couponFrequency;
    }

    public Date getMaturityDate() {
	return maturityDate;
    }

    public void setMaturityDate(Date maturityDate) {
	this.maturityDate = maturityDate;
    }

    public Date getPrevPaymentDate() {
        return prevPaymentDate;
    }

    public void setPrevPaymentDate(Date prevPaymentDate) {
        this.prevPaymentDate = prevPaymentDate;
    }

    public Date getNextPaymentDate() {
        return nextPaymentDate;
    }

    public void setNextPaymentDate(Date nextPaymentDate) {
        this.nextPaymentDate = nextPaymentDate;
    }

}
