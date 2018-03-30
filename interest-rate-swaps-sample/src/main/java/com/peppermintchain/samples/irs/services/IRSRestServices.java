package com.peppermintchain.samples.irs.services;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import com.peppermintchain.core.services.PMCServiceContext;
import com.peppermintchain.core.services.PMCServiceContext.PendingTransaction;
import com.peppermintchain.samples.irs.db.IRSContract;
import com.peppermintchain.samples.irs.db.IRSContractProposal;
import com.peppermintchain.samples.irs.db.IRSInterestRate;

@Path("/")
public class IRSRestServices {
    @Inject
    PMCServiceContext context;

    @Path("/hello")
    @GET
    public String hello() {
	return "IRS Demo:: Hello!" + context;
    }

    @Path("/listOffers")
    @GET
    @Produces("application/json")
    public List<IRSContractProposal> listOffers() throws Exception {
	List<IRSContractProposal> dbProposals = context.runPreparedQuery(
		"SELECT * FROM irs_contract_proposal WHERE STATUS <> 'MATCHED'", IRSContractProposal.class);
	List<IRSContractProposal> pending = context.getPendingTransactionsAs("com.peppermintchain.samples.irs",
		"proposeContract", IRSContractProposal.class);
	for (IRSContractProposal p : pending) {
	    p.setPending(true);
	}
	List<IRSContractProposal> rv = new ArrayList<>();
	rv.addAll(pending);
	rv.addAll(dbProposals);
	return rv;
    }

    @Path("/listContracts")
    @GET
    @Produces("application/json")
    public List<IRSContract> listContracts() throws SQLException {
	return context.runPreparedQuery("SELECT * FROM irs_contract", IRSContract.class);
    }

    @Path("/addOffer")
    @POST
    @Produces("application/json")
    public Object addOffer(Map<String, String> offerData) throws Exception {
	Set<String> peers = new HashSet<>();
	peers.add(offerData.get("buyerId"));
	peers.add(offerData.get("sellerId"));
	context.runContract(peers, "com.peppermintchain.samples.irs", "proposeContract", offerData);
	System.out.println(offerData);
	System.out.flush();
	return offerData;
    }

    @Path("/getContractDetails/{contractPath}")
    @GET
    @Produces("application/json")
    public IRSContract getContractDetails(@PathParam("contractPath") String contractPath) throws SQLException {
	String[] tmp = contractPath.split(":");
	List<IRSContract> rv = context.runPreparedQuery("SELECT * FROM irs_contract WHERE CONTRACT_ID = '" + tmp[0]
		+ "' AND BUYER_ID = '" + tmp[1] + "' AND SELLER_ID = '" + tmp[2] + "'", IRSContract.class);
	return rv.get(0);
    }

    @Path("/listInterestRates")
    @GET
    @Produces("application/json")
    public List<IRSInterestRate> listInterestRates() throws SQLException {
	return context.runPreparedQuery("SELECT * FROM IRS_INTEREST_RATE ORDER BY VALID_FOR_DATE DESC",
		IRSInterestRate.class);
    }

    @Path("/addInterestRate")
    @POST
    @Produces("application/json")
    public Object addInterestRate(Map<String, String> interestRateData) throws Exception {
	String validForDate = (String) interestRateData.get("validForDate");
	interestRateData.put("validForDate", validForDate.substring(0, 10));
	Set<String> peers = new HashSet<>();
	peers.add("ALL");
	context.runContract(peers, "com.peppermintchain.samples.irs", "addInterestRate", interestRateData);
	System.out.println(interestRateData);
	System.out.flush();
	return interestRateData;
    }

}
