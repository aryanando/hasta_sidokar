<?php

function get_ep_extension($ep_id){
    global $conn;

    $select_ep_statement = $conn->prepare("
        SELECT header_id, header_name
        FROM ep_extension_header
        WHERE header_ep_id = ? AND header_record_status = 'A'
        ORDER BY header_order
    ");

    $select_ep_statement->bind_param('i', $ep_id);
    $select_ep_statement->execute();

    $select_ep_result_set = $select_ep_statement->get_result();

    $response = [];
    while($row = $select_ep_result_set->fetch_assoc()){
        $row["detail"] = [];

        $id = $row["header_id"];

        $selected_ep_extension_detail_statement = $conn->prepare("
            SELECT detail_id, detail_name, information
            FROM ep_extension_detail
            WHERE header_id = ?
            AND detail_record_status = 'A'
            ORDER BY detail_order
        ");
        $selected_ep_extension_detail_statement->bind_param('i', $id);
        $selected_ep_extension_detail_statement->execute();
        $ep_link_result_set = $selected_ep_extension_detail_statement->get_result();
        while($rowLink = $ep_link_result_set->fetch_assoc()){
            $row["detail"][] = $rowLink;
        }

        $response[] = $row;
    }


    return $response;
}