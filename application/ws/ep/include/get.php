<?php

function get_ep_for_standard_at_chapter($chapter_id, $standard_id){
    global $conn;

    $select_ep_statement = $conn->prepare("
        SELECT ai.instrument_id, instrument_order_id, instrument_name,
        CASE
            WHEN aie.instrument_id IS NULL
            THEN 'false'
            ELSE 'true'
        END AS is_escaped,
        instrument_r, instrument_d, instrument_o, instrument_w, instrument_s
        FROM accreditation_instrument ai
        LEFT JOIN accreditation_instrument_escaped aie ON ai.instrument_id = aie.instrument_id
        WHERE instrument_chapter_id = ? AND instrument_standard_id = ? AND instrument_record_status = 'A'
    ");

    $select_ep_statement->bind_param('ii', $chapter_id, $standard_id);
    $select_ep_statement->execute();

    $select_ep_result_set = $select_ep_statement->get_result();

    $response = [];
    while($row = $select_ep_result_set->fetch_assoc()){
        $row["link"] = [];

        $id = $row["instrument_id"];
        $row["is_escaped"] = $row["is_escaped"] == "true" ? true : false;

        $select_ep_link_statement = $conn->prepare("
            SELECT link_id, link_ep_id_extending, link_type, ais.standard_code, ai.instrument_order_id
            FROM
            accreditation_instrument_link ail LEFT JOIN accreditation_instrument ai 
            ON ail.link_ep_id_extending = ai.instrument_id
            JOIN accreditation_instrument_standard ais ON ai.instrument_standard_id = ais.standard_id
            WHERE link_ep_id = ?
            AND link_record_status = 'A'
        ");

        $select_ep_link_statement->bind_param('i', $id);
        $select_ep_link_statement->execute();

        $ep_link_result_set = $select_ep_link_statement->get_result();

        while($rowLink = $ep_link_result_set->fetch_assoc()){
            $row["link"][] = $rowLink;
        }

        $row["extension"] = get_ep_extension($id);

        $response[] = $row;
    }


    return $response;
}