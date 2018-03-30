package com.peppermintchain.samples.irs.db;


import java.math.BigDecimal;
import java.util.Date;

import com.peppermintchain.core.annotations.PMCName;
import com.peppermintchain.core.annotations.PMCPrimaryKey;

@PMCName("IRS_CONTRACT_FLOWS")
@PMCPrimaryKey({ "CONTRACT_ID", "BUYER_ID", "SELLER_ID", "PAYMENT_DUE_DATE" })
public class IRSContractFlow {

    @PMCName("CONTRACT_ID")
    private String contractId;

    @PMCName("BUYER_ID")
    private String buyerId;

    @PMCName("SELLER_ID")
    private String sellerId;

    @PMCName("FIXED_LEG_AMOUNT")
    private BigDecimal fixedLegAmount;

    @PMCName("FLOAT_LEG_AMOUNT")
    private BigDecimal floatLegAmount;

    @PMCName("NET_AMOUNT")
    private BigDecimal netPayment;

    @PMCName("PAYMENT_DUE_DATE")
    private Date paymentDueDate;

    @PMCName("PAYMENT_REMITTANCE_DATE")
    private Date remittanceDate;

    @PMCName("PAYMENT_REFERENCE_ID")
    private String referenceId;

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

    public BigDecimal getFixedLegAmount() {
	return fixedLegAmount;
    }

    public void setFixedLegAmount(BigDecimal fixedLegAmount) {
	this.fixedLegAmount = fixedLegAmount;
    }

    public BigDecimal getFloatLegAmount() {
	return floatLegAmount;
    }

    public void setFloatLegAmount(BigDecimal floatLegAmount) {
	this.floatLegAmount = floatLegAmount;
    }

    public BigDecimal getNetPayment() {
	return netPayment;
    }

    public void setNetPayment(BigDecimal netPayment) {
	this.netPayment = netPayment;
    }

    public Date getPaymentDueDate() {
	return paymentDueDate;
    }

    public void setPaymentDueDate(Date paymentDueDate) {
	this.paymentDueDate = paymentDueDate;
    }

    public Date getRemittanceDate() {
	return remittanceDate;
    }

    public void setRemittanceDate(Date remittanceDate) {
	this.remittanceDate = remittanceDate;
    }

    public String getReferenceId() {
	return referenceId;
    }

    public void setReferenceId(String referenceId) {
	this.referenceId = referenceId;
    }

}
