import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import type {MouseEventHandler} from "react";

export default function BottomNav({previous, next, numberPage}: {
    previous: MouseEventHandler,
    next: MouseEventHandler,
    numberPage: number
}) {

    return (
        <Pagination className={"mt-10"}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={previous}
                        aria-disabled={numberPage === 0}
                        className={
                            numberPage === 0
                                ? "pointer-events-none opacity-50"
                                : "hover: cursor-pointer"
                        }
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink href="#">{numberPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">{numberPage + 1}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">{numberPage + 2}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        onClick={next}
                        className={"hover: cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}