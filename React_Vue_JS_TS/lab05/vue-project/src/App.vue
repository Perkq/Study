

<template>
<div class="main_container">
  <div class="text_container">
    <div class="head">The Koin Difference</div>
    <div class="main_text_div">We deliver more than just the features to manage and govern your cloud. Kion gives you a comprehensive solution for your cloud to enable your organization to achieve more.</div>
    <div class="list_text">
      <div class="list_header">our differences</div>
      <ul>
        <li>Cloud-native access</li>
        <li>A private, self-hosted architecture</li>
        <li>Multi-cloud control</li>
        <li>A single, intuitive interface</li>
      </ul>
    </div>
    <div class="end_text">Learn more</div>
  </div>
  <div class="video_container"></div>
</div>



<div class="footer">
  <div class="text_foot">
    <div class="list">
      <div class="footer_list_header">Our products</div>
      <ul>
        <li>Product Overview</li>
        <li>Automation & Orchestration</li>
        <li>Financial Management</li>
        <li>Continuous Compliance</li>
      </ul>
    </div>
    <div class="list">
      <div class="footer_list_header">Resources</div>
      <ul>
        <li>All Resources</li>
        <li>Blog</li>
        <li>Case Studies</li>
      </ul>
    </div>
    <div class="list">
      <div class="footer_list_header">Support</div>
      <ul>
        <li>Support Overview</li>
        <li>FAQ</li>
      </ul>
    </div>
    <div class="list">
      <div class="footer_list_header">About</div>
      <ul>
        <li>About Us</li>
        <li>Careers</li>
        <li>Contact</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import artemDebil from '@/components/Artem/ArtemDebil.vue';
export default {
  name: 'App',
  components: {
    artemDebil
  }
}
</script>

<style>
.main_container {
  width: 100%;
  display: contents;
  place-items: center;
}

.text_container {
  width: 60%;
  display: inline-block;
}

.head {
  font-family: 'Times New Roman';
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 60px;
/* or 100% */

letter-spacing: 1px;

margin-bottom: 25px;
}

.main_text_div {
  font-family: 'Arial';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 26px;
/* or 144% */


color: #40494D;
margin-bottom: 25px;
}

.list_header {
  font-family: 'Arial';
font-style: normal;
font-weight: 400;
font-size: 11px;
line-height: 14px;
/* identical to box height, or 127% */

letter-spacing: 1px;
text-transform: uppercase;

color: #283337;
}

ul {
  list-style-type: none;
  font-family: 'Arial';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 26px;
/* identical to box height, or 144% */


color: #40494D;
}

li {
  margin: 20px 0 20px 0;
}

.end_text {
  font-family: 'Arial';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 36px;
/* identical to box height, or 200% */


color: #40494D;
}

.video_container {
  place-self: center;
  display: inline-block;
  width: 640px;
  height: 360px;
  background: url("photos/Rectangle.jpg");
  border-radius: 6px;
}

/* ------------------------- footer ------------------------------------ */

.footer {
  background: #101C21;
  width: 100%;
}

.footer_list_header {
  font-family: 'Arial';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 18px;

color: #878D90;

}

.list > ul > li {
  font-family: 'Arial';
font-style: normal;
font-weight: 400;
font-size: 15px;
line-height: 17px;

color: #FFFFFF;
}
</style>
