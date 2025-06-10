function loadFooterComponent(){
    return `
    <div class='container' id='footerBox'>
        <div class='row'>
            <div class='col-5' id='footer-headText'> <h4><b> Vivek's Restaurant </b></h4 > </div>
            <div class='col-5'></div>
        </div>
        <br /> <br />
        <div class='row'>
            <div class='col-5'> 
                <b class='footer-sectionHeader'> For Reservations </b> <br/> <br />
                <div class='footer-link text-danger'> Contact us at  </div>
                <div class='footer-link'> Contact No.<br />  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +(91)1352763651 <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +(91)9720557588  </div>
                <div class='footer-link'> Email &nbsp;&nbsp;&nbsp; vivekrestaurant@gmail.com </div> <br />
                <div class='footer-link'> 
                    <a href='./about.html'>   <button class='btn outlined-red-btn-inverted'> More About Us </button>   </a>
                </div>
            </div>
            <div class='col-4'> 
                <b class='footer-sectionHeader'> For Enquiries </b> <br/> <br /> <br />
                <div class='footer-link text-danger'> Manager </div>
                <div class='footer-link'> Shop 1, Vasant Vihar, Near <br />Sethi Market, Balliwala, Dehradun </div>
            </div>
            <div class='col-3'> 
                <b class='footer-sectionHeader'> Opening Hours : Monday - Sunday  </b> <br/> <br /> <br />
                <div class='footer-link text-danger'> Timings  </div>
                <div class='footer-link'> 11: 00 AM - 10: 00 PM </div>
            </div>
        </div> <br />
        <hr />
        <div id='footer-credits'>
            © 2023 Vivek's Restaurant &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ALL RIGHTS RESERVED 
        </div>
    </div>`;
}