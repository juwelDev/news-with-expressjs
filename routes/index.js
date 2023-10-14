var express = require("express");
var router = express.Router();

const base_url = process.env.BASEURL || "http://localhost:3000";
var ViewModel = require('../models/viewModel');
var PostModel = require('../models/postModel');


const ViewAdd = async (req) => {
  let date = new Date();
  date = date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const postid = req.params.slug;
  const userip = req.socket.remoteAddress || req.ip;
  const referer = req.headers.referer;

  const useragent = req.session.useragent = {
    browser: req.useragent.browser,
    version: req.useragent.version,
    os: req.useragent.os,
    platform: req.useragent.platform,
    geoIp: req.useragent.geoIp, // needs support from nginx proxy
    source: req.useragent.source,
  };

  const ifconfigRes = await fetch(`https://ifconfig.co/json?ip=${userip}`);
  const ifconfig = await ifconfigRes.json();

  const user_agent = useragent;
  const device = req.device.type;
  const platform = useragent.platform;
  const operating = useragent.os;
  const browser = useragent.browser;
  const browser_version = useragent.version;
  let country;
  let time_zone;
  let asn;
  let asn_org;

  if (ifconfig.asn) {
    country = ifconfig.country;
    time_zone = ifconfig.time_zone;
    asn = ifconfig.asn;
    asn_org = ifconfig.asn_org;
  } else {
    country = '';
    time_zone = '';
    asn = '';
    asn_org = '';
  }

  const viewData = new ViewModel({
    postid: postid,
    userip: userip,
    method: 'GET',
    host: base_url,
    url: `${base_url}/${postid}`,
    referer: referer,
    user_agent: user_agent,
    country: country,
    device: device,
    platform: platform,
    operating: operating,
    browser: browser,
    browser_version: browser_version,
    time_zone: time_zone,
    asn: asn,
    asn_org: asn_org,
  });

  const PostView = await ViewModel.find({ postid: postid });
  var updatePost = {
    view: PostView.length,
  };

  await PostModel.updateOne({ slug: postid }, updatePost);

  const view = await ViewModel.findOne({ postid: postid, userip: userip, date_at: date });
  console.log('view :- ', view);
  if (view == null) {
    const addView = await new ViewModel(viewData).save()
    console.log('addView : ', addView)
  }
}



/* GET home page. */
router.get("/",async function (req, res, next) {
  
  const success = req.flash("success");
  const error = req.flash("error");
  const user = req.user;
  const posts = await PostModel.find({});


  //console.log('flash succes', success);
    //console.log('flash error', error); 
    //console.log('user', req.user);
  const data = {
    title: "Nes Express",
    baseUrl: base_url,
    flashsms: success,
    flasherr: error,
    user: user,
    posts: posts,
  };
  res.render("index", data);
});

/* GET slug page. */
router.get('/news/:slug', async function (req, res, next) {

  let slug = req.params.slug;
  console.log('slug :- ', slug);
  const post = await PostModel.findOne({ slug: slug });
  if (post) {
    ViewAdd(req);
    const data = {
      title: post.title,
      baseUrl: base_url,
      flashsms: req.flash('success'),
      flasherr: req.flash('error'),
      user: req.user,
      post: post,
    };
    res.render('postView', data);
  } else {
    const data = {
      title: 'Nes Express',
      baseUrl: base_url,
      flashsms: req.flash('success'),
      flasherr: req.flash('error'),
      user: req.user,
      posts: posts,
    };
    res.render('error404', data);
  }

});


router.get("/login", function (req, res, next) {
    const success = req.flash("success");
    const error = req.flash("error");

    
  res.render("login", {
    title: "User account login",
    flashsms: success,
    flasherr: error,
    user: req.user,
  });
});

router.get("/register", function (req, res, next) {
  res.render("register", {
    title: "User account register",
    errors: "",
    user: req.user,
  });
});
module.exports = router;
