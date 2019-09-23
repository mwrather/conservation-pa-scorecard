<!DOCTYPE html>
<html lang="en">
<head>

    <title>Virginia</title>

    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Archivo+Narrow|Nunito+Sans|Pragati+Narrow|Roboto+Condenseda|Roboto:400,700,900&display=swap"
          rel="stylesheet">

    <link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico"/>
    <link rel="stylesheet" href="css/senate-style-2019.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" crossorigin=""/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>


    <!--    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css" integrity="sha256-PF6MatZtiJ8/c9O9HQ8uSUXr++R9KBYu4gbNG5511WE=" crossorigin="anonymous" />    -->
    <script src="./js/vendor/leaflet.js" crossorigin=""></script>
    <script src="https://kit.fontawesome.com/349ec13eb2.js"></script>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.7/handlebars.js" integrity="sha256-3kxM38zABJY692X6ViIlt9FsBimhck0ZlsLtuA7R+0Y=" crossorigin="anonymous"></script>
</head>
<body>
<div class="feature-wrapper pt-5 pb-5 mt-5 mt-lg-0">
    <!-- wides go inside wrapper but outside outer and inner -->
    <div class="container" id="top">
        <div class="row">
            <div class="col-9">
                <h2>Senate Map
                    <!--                    </br> <small  class="text-muted">Find out your legislators' scores.</small>-->
                </h2>
            </div>
            <div class="col-3 ">

            </div>
        </div>
        <div class="row mt-2">
            <div class="col-4 default-text">
                <ul class="nav nav-pills flex-column flex-sm-row">
                    <a style="background-color: #0c0b3e" class="flex-fill text-sm-center nav-link active"
                       href="./2019-senate-map.html">Senate</a>
                    <a style="color:#0c0b3e;" class="flex-fill text-sm-center nav-link"
                       href="./2019-house-map.html">House</a>
                </ul>
            </div>
        </div>

        <div class="row">
            <div id="sidebar" class="col-4 default-text">
            </div>
            <div id="map" class="col-8">
            </div>
        </div>
    </div>

</div><!-- /container -->
<!--<script type="text/javascript" src="js/vendor/tabletop.min.js"></script>-->
<script src='https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.1/tabletop.min.js'></script>

<script type="text/javascript" src="./maps/tl_2019_51_sldu.js"></script>

<script src="js/app-2019-senate-map.js"></script>

<script id="welcome-map-help" type="text/x-handlebars-template">
    <div class="entry-default-text" style="padding-top:14px; display:block;">
        <div id=default-text class="body">
            <!--<p id='close2' class='close'>&times;</p><br>-->
            <h4 style="text-align: center">Welcome</h4>
            <ul>
                <li><strong>Mouseover</strong> a district for details.</li>
                <li><strong>Click a district</strong> to freeze the info panel.</li>
                <li><strong>Zoom</strong> into selected district to see street detail.</li>
                <li><strong>Click the 'x'</strong> to dismiss the info panel and re-enable mouseover
                    function.
                </li>
                <li><strong>Flip</strong> switch to show races targeted by flippable</li>

            </ul>

        </div>
    </div>
</script>
<script id="senate-template-bottom" type="text/x-handlebars-template">
    {{#each priority_votes}}
    <div class="entry priority_vote" id="bookmark_{{@index}}">
        <div class="body">
            <h5><a href="#top">{{vote_title}}</a></h5>
            <p>{{{vote_description}}}</p>
            {{result}}
        </div>
    </div>
    {{/each}}
</script>

<script id="senate-template-infobox" type="text/x-handlebars-template">
    <div class="entry parent" style="background-color: {{scoreColor}}; z-index:100;">
        <div class="infobox child">
            <button type='button' id='close' class='close'>&times;</button>
            <br>
            <h4 style="text-align:center">District {{{district}}}</h4>
            <p style="text-align:center">
                {{#if ldi}}LDI: {{{ldi}}}<br/>{{/if}}
                {{#if incumbent_party}}Incumbent (or Open): {{{incumbent_party}}}<br/>{{/if}}
                {{#if d_r_2015}}Dem/Rep 2017 (old district): {{{d_r_2015}}}<br/>{{/if}}
                {{#if northam_gillespie}}Northam/Gillespie: {{{northam_gillespie}}}<br/>{{/if}}
            </p>

            <!--<p class="child-header" style='background-color: {{#if_eq party "R"}}#DA3326{{else}}#2C65EC{{/if_eq}}'> {{{name}}} ({{{party}}})</p>-->


            {{#if d_candidate}}<p class="child-header" style='background-color: #2C65EC'>{{d_candidate}} (D)</p>{{/if}}

            <p>{{#if donate_link}}Donate link: <a target="_blank" style="text-decoration:underline"
                                                  href="{{donate_link}}">Donate</a>{{/if}}</p>
            <p>{{#if video_link}}Video: <a target="_blank" style="text-decoration:underline" href="{{video_link}}">{{video_link}}{{/if}}</a>
            </p>
            <!--<p>{{#if dem_cash_on_hand_8_31_19}}Cash on Hand: {{dem_cash_on_hand_8_31_19}}{{/if}}</p>-->

            {{#if r_candidate}}<p class="child-header" style='background-color: #DA3326'>{{r_candidate}} (D)</p>{{/if}}
            <p>{{#if r_cash_on_hand}}Cash on Hand: {{r_cash_on_hand}}{{/if}}</p>

            {{#if commentary}}<p>
            <hr/>
            </p><strong>Notes:</strong> {{commentary}} (D)</p>{{/if}}

            <br>

        </div>
    </div>
</script>
<script>
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        if (typeof a !== "undefined") {
            if (typeof a === "string") {
                a = a.trim();
            }
        }

        if (a === b) {
            return opts.fn(this);
        } else if (a === "nonvote") {
            return '<i class="fas fa-minus-circle fa-2x"></i>'
        } else {
            return opts.inverse(this);
        }
    });
</script>
</body>
</html>
