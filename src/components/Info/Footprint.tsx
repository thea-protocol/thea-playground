import React from 'react'

function Footprint() {
    const footprint = theaSDK.carbonInfo.estimateFootprint(1996, [
        {
          isoCode: "USA",
          year: 2003,
        },
        {
          isoCode: "FRA",
          year: 2008,
        },
        {
          isoCode: "GBR",
          year: null,
        },
      ]);
  
        console.log(footprint)

  return (
    <div>Footprint</div>
  )
}

export default Footprint