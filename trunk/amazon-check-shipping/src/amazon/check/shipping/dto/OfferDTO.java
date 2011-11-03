package amazon.check.shipping.dto;

public class OfferDTO {

	public static int AVAILABILITY_UNDEFINED = -1;
	public static int AVAILABILITY_YES = 1;
	public static int AVAILABILITY_NO = 0;
	private String merchantID;
	private String merchantName;
	private int availability = AVAILABILITY_UNDEFINED;
	private String merchantGlanceURL;
	private String merchantShippingURL;
	private String merchantRating;
	private Boolean isSingleMerchant;
	private String offerListingID;
	private String price;

	public String getMerchantID() {
		return merchantID;
	}

	public void setMerchantID(String merchantID) {
		this.merchantID = merchantID;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}

	public int getAvailability() {
		return availability;
	}

	public void setAvailability(int availability) {
		this.availability = availability;
	}

	public String getMerchantGlanceURL() {
		return merchantGlanceURL;
	}

	public void setMerchantGlanceURL(String merchantGlanceURL) {
		this.merchantGlanceURL = merchantGlanceURL;
	}

	public String getMerchantShippingURL() {
		return merchantShippingURL;
	}

	public void setMerchantShippingURL(String merchantShippingURL) {
		this.merchantShippingURL = merchantShippingURL;
	}

	public String getMerchantRating() {
		return merchantRating;
	}

	public void setMerchantRating(String merchantRating) {
		this.merchantRating = merchantRating;
	}

	public Boolean getIsSingleMerchant() {
		return isSingleMerchant;
	}

	public void setIsSingleMerchant(Boolean isSingleMerchant) {
		this.isSingleMerchant = isSingleMerchant;
	}

	public String getOfferListingID() {
		return offerListingID;
	}

	public void setOfferListingID(String offerListingID) {
		this.offerListingID = offerListingID;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}
}
