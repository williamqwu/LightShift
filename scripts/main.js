// Constants
var WALL = 0;
var LIGHT1 = 1;
var LIGHT2 = 2;
var LIGHT3 = 3;
var BLANK = 9;
var P1 = -1;
var P2 = -2;
var BROKEN = -99; // 99 for testing

var speed = 50;
var img_max_height = 50; // unit height
var img_max_width = 50; // unit width
var map_horizontal_count = 15;
var map_vertical_count = 14;
var p1_init_X = 3;
var p1_init_Y = 4;
var layer = 1; // temp layer (for future construction!)
var flag_win = 0; // 1 for winning!
const STATUS = document.getElementById('status');

// 0-wall, 9-blank, 1/2/3-light, (-1)-p1, (-2)-p2
var orimap = [
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0],
    [9, 0, 0, 9, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0],
    [9, 0, 0, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 0, 0],
    [9, 9, 9, 9, 9, 0, 0, 9, 0, 9, 0, 0, 9, 0, 0],
    [0, 0, 0, 9, 9, 9, 0, 9, 1, 9, 0, 0, 9, 0, 0],
    [0, 0, 0, 9, 9, 9, 0, 0, 1, 9, 9, 9, 9, 0, 0],
    [9, 0, 0, 0, 9, 9, 0, 0, 9, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 9, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9],
    [9, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [9, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 3],
    [9, 0, 0, 0, 9, 9, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [9, 9, 9, 9, 9, 9, 2, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var tmp_p1 = [3, 3]; // It starts from 0!!!
var tmp_p2 = [14, 7];

var map = { width: img_max_width * map_horizontal_count, height: img_max_height * map_vertical_count };
var box = { width: img_max_width, height: img_max_height };
var nums = {
    hNum: map.width / box.width,
    vNum: map.height / box.height
};
var unit = [];

window.onload = function() {
    initMap();
    // setInterval(move, 400);
    window.onkeydown = function(evt) {
        // var flag_bingo = 0;
        switch (evt.keyCode) {
            case 87: // w(up)
                {
                    lmx.style.backgroundImage = "url(resources/lmx_back.PNG)"
                    if ((tmp_p1[1] - 1) < 0 || (tmp_p1[1] - 1) >= map_vertical_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p1[1] - 1][tmp_p1[0]] > 0) {
                        switch (orimap[tmp_p1[1]][tmp_p1[0]]) {
                            case BLANK:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                                    break;
                                }
                            case LIGHT3:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "light2";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = LIGHT2;
                                    break;
                                }
                            case LIGHT2:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "light1";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = LIGHT1;
                                    break;
                                }
                            case LIGHT1:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "blank";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = BLANK;
                                    break;
                                }
                            default:
                                break;
                        }
                        // orimap[tmp_p1[1] - 1][tmp_p1[0]] = P1;
                        tmp_p1[1] = tmp_p1[1] - 1;
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "p1";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 83: // s(down)
                {
                    lmx.style.backgroundImage = "url(resources/lmx_front.PNG)"
                    if ((tmp_p1[1] + 1) < 0 || (tmp_p1[1] + 1) >= map_vertical_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p1[1] + 1][tmp_p1[0]] > 0) {
                        // unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                        // orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                        switch (orimap[tmp_p1[1]][tmp_p1[0]]) { // Actually, these switches can be merged (totally 8 of them). I don't have enough time to implement that. Sorry for the trash code.
                            case BLANK:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                                    break;
                                }
                            case LIGHT3:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "light2";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = LIGHT2;
                                    break;
                                }
                            case LIGHT2:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "light1";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = LIGHT1;
                                    break;
                                }
                            case LIGHT1:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "blank";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = BLANK;
                                    break;
                                }
                            default:
                                break;
                        }
                        // orimap[tmp_p1[1] + 1][tmp_p1[0]] = P1;
                        tmp_p1[1] = tmp_p1[1] + 1;
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "p1";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 65: // a(left)
                {
                    lmx.style.backgroundImage = "url(resources/lmx_left.PNG)"
                    if ((tmp_p1[0] - 1) < 0 || (tmp_p1[0] - 1) >= map_horizontal_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p1[1]][tmp_p1[0] - 1] > 0) {
                        // unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                        // orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                        switch (orimap[tmp_p1[1]][tmp_p1[0]]) {
                            case BLANK:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                                    break;
                                }
                            case LIGHT3:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "light2";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = LIGHT2;
                                    break;
                                }
                            case LIGHT2:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "light1";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = LIGHT1;
                                    break;
                                }
                            case LIGHT1:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "blank";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = BLANK;
                                    break;
                                }
                            default:
                                break;
                        }
                        // orimap[tmp_p1[1]][tmp_p1[0] - 1] = P1;
                        tmp_p1[0] = tmp_p1[0] - 1;
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "p1";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 68: // d(right)
                {
                    lmx.style.backgroundImage = "url(resources/lmx_right.PNG)"
                    if ((tmp_p1[0] + 1) < 0 || (tmp_p1[0] + 1) >= map_horizontal_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p1[1]][tmp_p1[0] + 1] > 0) {
                        // unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                        // orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                        switch (orimap[tmp_p1[1]][tmp_p1[0]]) {
                            case BLANK:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "broken";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = BROKEN;
                                    break;
                                }
                            case LIGHT3:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "light2";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = LIGHT2;
                                    break;
                                }
                            case LIGHT2:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "light1";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = LIGHT1;
                                    break;
                                }
                            case LIGHT1:
                                {
                                    unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "blank";
                                    orimap[tmp_p1[1]][tmp_p1[0]] = BLANK;
                                    break;
                                }
                            default:
                                break;
                        }
                        // orimap[tmp_p1[1]][tmp_p1[0] + 1] = P1;
                        tmp_p1[0] = tmp_p1[0] + 1;
                        unit[tmp_p1[1] * 15 + tmp_p1[0]].className = "p1";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 73: // i(p2-up)
                {
                    wqh.style.backgroundImage = "url(resources/wqh.PNG)"
                    if ((tmp_p2[1] - 1) < 0 || (tmp_p2[1] - 1) >= map_vertical_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p2[1] - 1][tmp_p2[0]] > 0) {
                        // unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "broken";
                        // orimap[tmp_p2[1]][tmp_p2[0]] = BROKEN;
                        switch (orimap[tmp_p2[1]][tmp_p2[0]]) {
                            case BLANK:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "broken";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = BROKEN;
                                    break;
                                }
                            case LIGHT3:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "light2";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = LIGHT2;
                                    break;
                                }
                            case LIGHT2:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "light1";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = LIGHT1;
                                    break;
                                }
                            case LIGHT1:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "blank";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = BLANK;
                                    break;
                                }
                            default:
                                break;
                        }
                        // orimap[tmp_p2[1] - 1][tmp_p2[0]] = P2;
                        tmp_p2[1] = tmp_p2[1] - 1;
                        unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "p2";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 75: // k(p2-down)
                {
                    wqh.style.backgroundImage = "url(resources/wqh.PNG)"
                    if ((tmp_p2[1] + 1) < 0 || (tmp_p2[1] + 1) >= map_vertical_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p2[1] + 1][tmp_p2[0]] > 0) {
                        // unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "broken";
                        // orimap[tmp_p2[1]][tmp_p2[0]] = BROKEN;
                        switch (orimap[tmp_p2[1]][tmp_p2[0]]) {
                            case BLANK:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "broken";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = BROKEN;
                                    break;
                                }
                            case LIGHT3:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "light2";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = LIGHT2;
                                    break;
                                }
                            case LIGHT2:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "light1";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = LIGHT1;
                                    break;
                                }
                            case LIGHT1:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "blank";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = BLANK;
                                    break;
                                }
                            default:
                                break;
                        }
                        // orimap[tmp_p2[1] + 1][tmp_p2[0]] = P2;
                        tmp_p2[1] = tmp_p2[1] + 1;
                        unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "p2";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 74: // j(left)
                {
                    wqh.style.backgroundImage = "url(resources/wqh_with_car.PNG)"
                    if ((tmp_p2[0] - 1) < 0 || (tmp_p2[0] - 1) >= map_horizontal_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p2[1]][tmp_p2[0] - 1] > 0) {
                        // unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "broken";
                        // orimap[tmp_p2[1]][tmp_p2[0]] = BROKEN;
                        switch (orimap[tmp_p2[1]][tmp_p2[0]]) {
                            case BLANK:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "broken";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = BROKEN;
                                    break;
                                }
                            case LIGHT3:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "light2";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = LIGHT2;
                                    break;
                                }
                            case LIGHT2:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "light1";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = LIGHT1;
                                    break;
                                }
                            case LIGHT1:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "blank";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = BLANK;
                                    break;
                                }
                            default:
                                break;
                        }
                        // orimap[tmp_p2[1]][tmp_p2[0] - 1] = P2;
                        tmp_p2[0] = tmp_p2[0] - 1;
                        unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "p2";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 76: // l(right)
                {
                    wqh.style.backgroundImage = "url(resources/wqh_with_car.PNG)"
                    if ((tmp_p2[0] + 1) < 0 || (tmp_p2[0] + 1) >= map_horizontal_count) {
                        console.log("Out of range!")
                        break;
                    }
                    if (orimap[tmp_p2[1]][tmp_p2[0] + 1] > 0) {
                        // unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "broken";
                        // orimap[tmp_p2[1]][tmp_p2[0]] = BROKEN;
                        switch (orimap[tmp_p2[1]][tmp_p2[0]]) {
                            case BLANK:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "broken";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = BROKEN;
                                    break;
                                }
                            case LIGHT3:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "light2";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = LIGHT2;
                                    break;
                                }
                            case LIGHT2:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "light1";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = LIGHT1;
                                    break;
                                }
                            case LIGHT1:
                                {
                                    unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "blank";
                                    orimap[tmp_p2[1]][tmp_p2[0]] = BLANK;
                                    break;
                                }
                            default:
                                break;
                        }
                        // orimap[tmp_p2[1]][tmp_p2[0] + 1] = P2;
                        tmp_p2[0] = tmp_p2[0] + 1;
                        unit[tmp_p2[1] * 15 + tmp_p2[0]].className = "p2";
                    } else {
                        console.log("Invalid movement!")
                    }
                    break;
                }
            case 55:
                {
                    for (var i = 0; i < nums.vNum; i++) {
                        for (var j = 0; j < nums.hNum; j++) {
                            orimap[i][j] = 0;
                        }
                    }
                    flag_win = 1;
                    break;
                }
            default:
                break;
        }
        flag_win = 1;
        for (var i = 0; i < nums.vNum; i++) {
            for (var j = 0; j < nums.hNum; j++) {
                if (orimap[i][j] != WALL && orimap[i][j] != BROKEN && !(i == tmp_p1[1] && j == tmp_p1[0] || i == tmp_p2[1] && j == tmp_p2[0])) flag_win = 0;
            }
        }
        if (flag_win) {
            console.log("Congratulations, You win!");
            STATUS.innerHTML = "Status: Winning!";
        }
    }
}

function initMap() {
    var map_target = document.getElementById("map");

    map_target.style.width = map.width + "px";
    map_target.style.height = map.height + "px";
    var newSpan = null;

    for (var i = 0; i < nums.vNum; i++) {
        for (var j = 0; j < nums.hNum; j++) {
            newSpan = document.createElement("span");
            newSpan.style.width = box.width + "px";
            newSpan.style.height = box.height + "px";
            newSpan.id = 15 * i + j;
            // console.log(15 * i + j);
            map_target.appendChild(newSpan);
            unit.push(newSpan);
            if (i == tmp_p1[1] && j == tmp_p1[0]) {
                newSpan.className = "p1";
                // tmp_p1[0] = j;
                // tmp_p1[1] = i;
            } else if (i == tmp_p2[1] && j == tmp_p2[0]) {
                newSpan.className = "p2";
                // tmp_p2[0] = j;
                // tmp_p2[1] = i;
            } else {
                if (orimap[i][j] == 0) {
                    newSpan.className = "wall";
                    // other.push(newSpan);
                } else if (orimap[i][j] == 1) {
                    newSpan.className = "light1";
                } else if (orimap[i][j] == 2) {
                    newSpan.className = "light2";
                } else if (orimap[i][j] == 3) {
                    newSpan.className = "light3";
                } else {
                    newSpan.className = "blank";
                }
            }
        }
    }
}