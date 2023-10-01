<template>
    <div id="About" class="footer">
            <textList v-bind:text_list = "firstList" v-bind:head_text = "headTxt1" v-bind:id_div = "id_div1"/>
            <textList v-bind:text_list= "secondList" v-bind:head_text = "headTxt2" v-bind:id_div = "id_div2"/>
            <textList v-bind:text_list= "thirdList" v-bind:head_text = "headTxt3" v-bind:id_div = "id_div3"/>
            <textList v-bind:text_list= "fourthList" v-bind:head_text = "headTxt4" v-bind:id_div = "id_div4"/>
            <img src="@/components/FooterBlock/symbol.png" alt="symbol" class="imageSymb" />

            <div class="added_list">
                <ul>
                    <li>Integrations</li>
                    <li>Request a Demo</li>
                    <li>Try Kion For Free</li>
                </ul>
            </div>
            <div class="form_container">
                <form id="app" @submit="checkForm" novalidate="true" method="post">
                    <div class="signUp">Sign up for our monthly newsletter</div>
                    <input type="email" class="text_input" name="email" required placeholder="Enter email..." />
                    <button v-on:submit.prevent="onsubmit"  type="submit" class="btn_subm">Subscribe</button>
                </form>
            </div>
            <button class="footer_btn">Schedule Demo</button>
            <div class="footer_nav">
                <div class="symbols">
                    <logoList v-bind:logo_list="logo_list"/>
                </div>
                <div class="footer_nav_text">
                    <div>License Agreement</div>
                    <div>Privacy Policy</div>
                </div>
                <div class="copyright_text">Copyright © 2021 Nor Labs, Inc. All rights reserved.</div>
            </div>
    </div>

    <!-- <div class="btn"><TextButtonBlock></TextButtonBlock></div> -->

</template>

<script>
import textList from "@/components/FooterBlock/textList.vue";
import logoList from "../FirstScreen/logoList.vue";
// import TextButtonBlock from "../TextButtonBlock.vue";

export default {
    name: "footerLists",
    components: {
        textList, logoList
    },

    el: '#app',
    methods: {
            checkForm: function(e) {
                if (!this.email) {
                    alert("pizda");
                    this.errors.push('Укажите электронную почту.');
                } else if (!this.validEmail(this.email)) {
                    this.errors.push('Укажите корректный адрес электронной почты.');
                }
                e.prevent("onsubmit");
                },
            validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
        },
    

    data() {
        return {
            email: null,
            headTxt1: "Our Product",
            firstList:[
                {id: 1, title: "Product Overview"},
                {id: 2, title: "Automation & Orchestration"},
                {id: 3, title: "Financial Management"},
                {id: 4, title: "Continuous Compliance"},
            ],
            id_div1: "id1",

            headTxt2: "Resources",
            secondList:[
                {id: 1, title: "All Resources"},
                {id: 2, title: "Blog"},
                {id: 3, title: "Case Studies"},
            ],
            id_div2: "id2",

            headTxt3: "Support",
            thirdList:[
                {id: 1, title: "Support Overview"},
                {id: 2, title: "FAQs"},
            ],
            id_div3: "id3",

            headTxt4: "About",
            fourthList:[
                {id: 1, title: "About Us"},
                {id: 2, title: "Careers"},
                {id: 3, title: "Contact"},
            ],
            id_div4: "id4",
            
            logo_list:[
                {id:1, src:"assets/twitter.png"},
                {id:2, src:"assets/facebook.png"},
                {id:3, src:"assets/linkedin.png"},
                {id:4, src:"assets/instagram.png"},
            ],
        };
    }
}
</script>

<style>
@import './footer.css';

</style>