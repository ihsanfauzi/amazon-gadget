package amazon.check.shipping.dto;

import java.util.ArrayList;

public class ShippingPriceDTO {

	public boolean isComplex;
	public ArrayList<ShipmentBandsDTO> perShipmentBandsStandard = new ArrayList<ShipmentBandsDTO>();
	public ArrayList<ShipmentBandsDTO> perShipmentBandsExpedited = new ArrayList<ShipmentBandsDTO>();
	
	public Double perItemStandard;
	public Double perWeightStandard;
	public Double perShipmentStandard;
	public Double perItemExpedited;
	public Double perWeightExpedited;
	public Double perShipmentExpedited;

}
